## Strategy for the database

* The comments will be stored in the database using the strategy defined in [this article](https://medium.com/@V_Voronenko/storing-tree-like-hierarchy-structures-with-mongodb-4f97b7bee472).

* Comment Schema:

```javascript
const comment = {
  _tree_order: Number,
  _count_order: Number,
  num_children: Number,
  depth: Number,
  ups: Number,
  downs: Number,
  post_id: String,
  parent_id: String,
  id: String,
  body: String,
  author_id: String
}
```
* The `num_children` property is necessary for the client side to know when to Display "Show More" links. If `num_children` is greater than the actual number of children received, the client side will display a link that is gonna send a request to server to fetch more children

## Representation of the comment tree in the database

In the database, the tree-like structure of the comments will be stored in their order relative to one another. For example:

```javascript
// The commentsArray will be generated from a query for comments that are children of some post_id ordered by their order property 
commentsArray = [
  {id: 1, depth: 0, parent: 0, order: 0},
  {id: 2, depth: 1, parent: 1, order: 100},
  {id: 3, depth: 2, parent: 2, order: 200},
  {id: 4, depth: 2, parent: 2, order: 250},
  {id: 4, depth: 1, parent: 1, order: 275},
  {id: 5, depth: 0, parent: 0, order: 300},
  {id: 4, depth: 1, parent: 5, order: 400}
]
```
On the client-side, the nested tree structure can be generated very efficiently using a simple algorithm, thanks to the order of the elements in the list.


## Operations with comments:

* **Get Comments from Post (Read 1)**: 
  1. find `post_id = <post_id>`.
  2. order by `_order`. (This creates the tree)
  3. `depth <= 5`. (This limits the tree size in the depth direction)
  4. `_count_order < 10` (This limits the tree size in the length direction)
      * For the top level comments, `_count_order` will be in an interval that is going to be calculated by the page number

* **Create**:
  1. find the child of the `parent_id` with the highest `_count_order` (or `_order`). This is going to be `sibling` of the new comment.
  2. From the `sibling`, find the next comment in the tree representation. Do that by getting the comment whose order is just greater than the `sibling`'s order. This element is called `next`.
  3. Create a new comment with these properties:
      ```
        parent_id: <parent_id>
        depth: <depth>
        _order: (sibling._order + next._order) / 2
        _count_order: sibling._count_order + 1
      ```
  4. Increment the parent's `num_children`

* **Like/Dislike comment**: 
  1. find all comments that are children of `parent_id`.
  2. Order them by `_order` (or `_count_order`). This will give the liked/disliked `current` comment its `higher` and `lower` siblings.
  3. If `(higher.ups - higher.downs) < (current.ups - current.downs)`, swap the (doesn't work)

* **Delete**: Update the comment's body, ups, and downs, to the deleted status, but don't remove the comment from the database, as it would live its children without a parent.

* **Update**: Trivial.