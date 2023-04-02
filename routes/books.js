let fs = require('fs')

let express = require('express')
let router = express.Router()
let uniqid = require('uniqid')
const Joi = require('joi');
const { join } = require('path');
const { title } = require('process');


router.get('/', (req, res) => {
    res.render('books', { books: getAll('books')})
})

router.route('/create')
    .get((req, res) => {
        res.render('create-book', { modules: getAll('modules')})
    })
   .post(( req, res) => {
        let books = getAll('books')
            
        books.push({
                id: uniqid(),
                title: req.body.title,
                author:req.body.author,
                year: req.body.year,
                module: req.body.module
            })
            saveAll('books', books)
        
            res.redirect('/books')
        })
  


router.delete('/delete', (req, res) => {
    
    let books = getAll('books')

    let filteredBooks = books.filter(book => book.id != req.body.id)

    saveAll('books', filteredBooks)

    res.json({ deleted: true })
})

router.route('/update/:id')
    .get((req, res) => {
        let id = req.params.id
        let book = getAll('books').find(book => book.id == id)
        res.render('create-book', { book: book, modules: getAll('modules') })
    })
    .put((req, res) => {
        let id = req.params.id

        let books = getAll('books')

        let book = books.find(book => book.id == id)

        let idx = books.indexOf(book)
       
        books[idx].title = req.body.data.title
        books[idx].author = req.body.data.author
        books[idx].year = req.body.data.year
        books[idx].module = req.body.data.module

        saveAll('books', books)
        res.redirect('/books')

        res.json({ updated: true })

        })

 



module.exports = router



function  getAll(collection) {
    return JSON.parse(fs.readFileSync(`./data/${collection}.json`))
}

function saveAll(collection, data) {
    fs.writeFileSync(`./data/${collection}.json`, JSON.stringify(data))
}

//validation
function validateCustomer(customer){
    const scheme={
        title:Joi.string().min(3).max(30).required(),
        author:Joi.string().min(2).max(30).required(),
        year:Joi.number().integer().max(2023)
    };
    return Joi.validate(customer,scheme);
}

