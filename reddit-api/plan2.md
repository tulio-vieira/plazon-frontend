## Strategy for the database

[sort explanation](https://kb.objectrocket.com/mongo-db/use-mongoose-to-sort-by-multiple-field-725) \
[$in](https://docs.mongodb.com/manual/reference/operator/query/in/) operator

* The comments will be stored in the database using the strategy defined in [this article](https://medium.com/@V_Voronenko/storing-tree-like-hierarchy-structures-with-mongodb-4f97b7bee472).

* Comment Schema:

```javascript
const comment = {
  _order: Number,
  num_children: Number,
  depth: Number,
  ups: Number,
  downs: Number,
  post_id: String,
  parent_id: String,
  id: String,
  body: String,
  author_id: String,
  date_created: Date
}
```
* The `num_children` property is necessary for the client side to know when to Display "Show More" links. If `num_children` is greater than the actual number of children received, the client side will display a link that is gonna send a request to server to fetch more children

## Representation of the comment tree in the database

In the database, the tree-like structure of the comments will be stored by links to the comment's parent. Each comment also has an `order` property, which represents its order in relation to its siblings.

```javascript
// each commentsArray_<depth> is the result of a query in the database.
commentsArray_0 = [
  {id: 1, depth: 0, parent: 0, order: 0},
  {id: 2, depth: 0, parent: 0, order: 1},
  {id: 3, depth: 0, parent: 0, order: 2}
];

commentsArray_1 = [
  {id: 4, depth: 1, parent: 1, order: 0}
  {id: 5, depth: 1, parent: 2, order: 0}
  {id: 6, depth: 1, parent: 2, order: 1}
  {id: 7, depth: 1, parent: 3, order: 0}
  {id: 8, depth: 1, parent: 3, order: 1}
];

commentsArray_2 = [
  {id: 9, depth: 2, parent: 4, order: 0}
  {id: 10, depth: 2, parent: 4, order: 1}
  {id: 14, depth: 2, parent: 4, order: 2}
  {id: 11, depth: 2, parent: 6, order: 0}
  {id: 12, depth: 2, parent: 7, order: 0}
  {id: 13, depth: 2, parent: 8, order: 0}
];
```

On the client-side, the nested tree structure can be generated very efficiently using a simple algorithm, thanks to the order of the elements in the lists.

## Operations with comments:

* **Get Comments from Post (Read)**: 
  1. Find comments with `post_id = <post_id>` ordered by `_order`. Limit the search to the desired amount based on the `(pag - 1)*n < _order < pag*n`.
  2. Get the `id`s from `comments_0` and perform another search to find all children, once again ordering and limiting the search. Save them in `comments_1`.
  3. Repeat until the desired depth is reached.
    * Obs.: In the front end, the `pag` (pagination) prop is attached to every parent. That way, when a "See More" link is clicked, the request is sent with `pag` incremented.

* **Create**:
  1. Create new comment with the right `parent_id` and `post_id`.
  2. Get the last comment from the parent (greatest `_order`) and set the new comment's `_order` to be this sibling's order + 1.
  2. Increment the parent's `num_children`.

* **Like/Dislike comment (Update)**:
  1. find all comments that are children of `parent_id`.
  2. Order them by `_order`. This will give the liked/disliked `current` comment its `higher` and `lower` siblings.
  3. If `(higher.ups - higher.downs) < (current.ups - current.downs)`, swap `higher._order` with `current._order`. Anagolously, do the appropriate operation for the coparison with the `lower` sibling.

   * Alternative: Try to find the siblings with the same amount of `ups - downs`. If there are none, there is no need to change the comment's position.

* **Delete**: Update the comment's body, ups, and downs, to the deleted status, but don't remove the comment from the database, as it would live its children without a parent.