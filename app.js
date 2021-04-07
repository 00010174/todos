/**
 * Third party libs
 * */
const express = require('express')
const app = express()

/**
 * Node libs
 * */
const fs = require('fs')

const PORT = 8080

app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err
        const todos = JSON.parse(data)
        res.render('home', {todos: todos})
    })

})

app.post('/add', (req, res) => {
    const formData = req.body
    if (formData.todo.trim() === '') {
        fs.readFile('./data/todos.json', (err, data) => {
            if (err) throw err

            const todos = JSON.parse(data)
            res.render('home', {error: true, todos: todos})
        })
    } else {
        fs.readFile('./data/todos.json', (err, data) => {
            if (err) throw err

            const todos = JSON.parse(data)

            const todo = {
                id: id(),
                description: formData.todo,
                done: false
            }

            todos.push(todo)

            fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
                if (err) throw err
                fs.readFile('./data/todos.json', (err, data) => {
                    if (err) throw err

                    const todos = JSON.parse(data)
                    res.render('home', {success: true, todos: todos})
                })
            })
        })
    }
})

app.get('/:id/delete', (req, res) => {
    const id = req.params.id
    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err
        const todos = JSON.parse(data)
        const filteredTodos = todos.filter(todo => todo.id !== id)
        fs.writeFile('./data/todos.json', JSON.stringify(filteredTodos), (err) => {
            if (err) throw err
            res.render('home', {todos: filteredTodos, deleted: true})
        })
    })
})

app.get('/:id/update', (req, res) => {
    const id = req.params.id
    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err
        const todos = JSON.parse(data)
        const todo = todos.filter(todo => todo.id === id)[0]

        const todoIndex = todos.indexOf(todo)
        const splicedTodo = todos.splice(todoIndex, 1)[0]

        splicedTodo.done = !splicedTodo.done
        todos.push(splicedTodo)

        fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
            if (err) throw err
            res.render('home', {todos: todos})
        })

    })
})

app.get('/api/v1/todos', (req, res) => {
    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err
        const todos = JSON.parse(data)
        res.json(todos)
    })
})

app.post('/api/v1/:id/update', (req, res) => {
    const id = req.params.id
    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err
        const todos = JSON.parse(data)
        const todo = todos.filter(todo => todo.id === id)[0]

        const todoIndex = todos.indexOf(todo)
        const splicedTodo = todos.splice(todoIndex, 1)[0]

        splicedTodo.done = !splicedTodo.done
        todos.push(splicedTodo)
        fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
            if (err) throw err
            const responseData = {
                success: true,
                list: todos
            }
            res.json(responseData)
        })
    })
})

app.post('/api/v1/:id/delete', (req, res) => {
    const id = req.params.id
    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err
        const todos = JSON.parse(data)
        const filteredTodos = todos.filter(todo => todo.id !== id)
        fs.writeFile('./data/todos.json', JSON.stringify(filteredTodos), (err) => {
            if (err) throw err
            const responseData = {
                success: true,
                list: filteredTodos
            }
            res.json(responseData)
        })
    })
})

app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`This app is running on port ${PORT}`)
})

function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
