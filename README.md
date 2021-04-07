# TODO APPLICATION

This app helps to save your todos in the server

#### Instructions

1. Download the sourse code
```bash
git clone https://github.com/00010174/todos.git
```

or just download the *.zip file

2. Install dependincies
```bash
npm install
```

3. Run the applicaiton
```bash
node app
```

#### Dependencies list
- express
- pug

#### Lint to github repository
https://github.com/00010174/todos.git

#### Link to application on Glitch
https://lacy-honored-twine.glitch.me/

## You can use this as REST API

#### Get all todos

```bash
GET /ap1/v1/todos
```

Returns list of all todos

#### Change Todo status
```bash
POST /api/v1/{id}/update'
```
Send id of todo and this method toggle status of todo.
Returns success and list of todos

#### Delete Todo 
```bash
POST /api/v1/{id}/delete'
```
Send id of todo and this method Delete todo from list.
Returns success and list of todos