const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./database.db');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.get('/',(req, resp)=>{
    resp.send("<h1>Hello World</h1>");
})

//Rota para verificar as tarefas inseridas no banco

app.get('/tarefas',(req, resp)=>{
    
        
    db.all(`SELECT * FROM TAREFAS;`, (err,rows)=>{
        resp.send(JSON.stringify({results:rows}))
    })
    
})

//Rota para adicionar nova tarefa no banco

app.post('/tarefas',(req, resp)=>{
    
      
    db.run(`INSERT INTO TAREFAS (titulo, descricao, status) VALUES (?,?,?)`,[req.body.titulo,req.body.descricao,req.body.status], (err)=>{
        if(err) console.log("Deu ruim");
    })

    resp.status(200).send('Item inserido');
    
})

//Rota para deletar tarefa inserida no banco

app.delete('/tarefas/:id',(req, resp)=>{

    db.run(`DELETE FROM TAREFAS WHERE id= ?`,[req.params.id], (err)=>{
        if(err) console.log("Deu ruim");
    })

    resp.status(200).send('Item removido');

})

//Rota para atualizar tarefa inserida no banco

app.put('/tarefas/:id',(req, resp)=>{
    
      
    db.run(`UPDATE TAREFAS SET titulo = ?, descricao = ?, status = ? where id =?`,[req.body.titulo,req.body.descricao,req.body.status, req.params.id], (err)=>{
        if(err) console.log("Deu ruim");
    })

    resp.status(200).send('Item modificado');
    
})


app.listen(3000, ()=>{
    console.log("localhost:3000")
})


process.on('SIGINT', ()=> {
    db.close((err) => {
        console.log("Banco encerrado com sucesso!");
        process.exit(0);
    })
})