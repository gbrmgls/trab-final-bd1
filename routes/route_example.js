const express = require("express");
const db = require("../database.js")
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).send("Hello!");
});

router.get("/bd_ufv", (req, res, next) => {
    db.raw(`SELECT Campus.SiglaCamp, Campus.nome, Campus.Foto, SUM(Turma.NumEstudantes) , SUM(Turma.Aprovados) 
            FROM Campus 
            LEFT JOIN Curso 
            ON Campus.SiglaCamp = Curso.SiglaCamp
            LEFT JOIN Turma
            ON Turma.CodCurso = Curso.CodCurso
            GROUP BY Campus.SiglaCamp`)
        .then((data) => {
            res.send(data[0]);
        }).catch(err => {
            console.log(err)
            res.send(err);
        })
});

router.get("/bd_ufv/departamento/:depto", (req, res, next) => {
    db.raw(`SELECT Disciplina.CodDisc, Disciplina.Nome, sum(Turma.NumEstudantes), sum(Turma.Aprovados) 
            FROM Departamento
            JOIN Disciplina
            ON Departamento.SiglaDepto = Disciplina.SiglaDepto
            JOIN Turma
            ON Turma.CodDisc = Disciplina.CodDisc
            WHERE Departamento.SiglaDepto = '${req.params.depto}'
            GROUP BY Disciplina.CodDisc, Disciplina.Nome
            ORDER BY sum(Turma.Aprovados)/sum(Turma.NumEstudantes)`)
        .then((data) => {
            res.send(data);
        }).catch(err => {
            console.log(err)
            res.send(err);
        })
});

router.get("/bd_ufv/departamento/:depto/:ano", (req, res, next) => {
    db.raw(`SELECT Disciplina.CodDisc, Disciplina.Nome, sum(Turma.NumEstudantes), sum(Turma.Aprovados) 
            FROM Departamento
            JOIN Disciplina
            ON Departamento.SiglaDepto = Disciplina.SiglaDepto
            JOIN Turma
            ON Turma.CodDisc = Disciplina.CodDisc
            WHERE Departamento.SiglaDepto = '${req.params.depto}'
            AND Turma.Ano = ${req.params.ano}
            AND Turma.Ano = Disciplina.Ano
            GROUP BY Disciplina.CodDisc, Disciplina.Nome
            ORDER BY sum(Turma.Aprovados)/sum(Turma.NumEstudantes)`)
        .then((data) => {
            res.send(data);
        }).catch(err => {
            console.log(err)
            res.send(err);
        })
});

router.get("/bd_ufv/:campus", (req, res, next) => {
    db.raw(`SELECT Curso.nome, SUM(Turma.NumEstudantes) , SUM(Turma.Aprovados) 
            FROM Campus 
            LEFT JOIN Curso 
            ON Campus.SiglaCamp = Curso.SiglaCamp
            LEFT JOIN Turma
            ON Turma.CodCurso = Curso.CodCurso
            WHERE Campus.SiglaCamp = "${req.params.campus}"
            GROUP BY Curso.CodCurso`)
        .then((data) => {
            res.send(data[0]);
        }).catch(err => {
            console.log(err)
            res.send(err);
        })
});

router.get("/bd_ufv/:campus", (req, res, next) => {
    db.raw(`SELECT Curso.nome, SUM(Turma.NumEstudantes) , SUM(Turma.Aprovados) 
            FROM Campus 
            LEFT JOIN Curso 
            ON Campus.SiglaCamp = Curso.SiglaCamp
            LEFT JOIN Turma
            ON Turma.CodCurso = Curso.CodCurso
            WHERE Campus.SiglaCamp = "${req.params.campus}"
            GROUP BY Curso.CodCurso`)
        .then((data) => {
            res.send(data[0]);
        }).catch(err => {
            console.log(err)
            res.send(err);
        })
});

router.get("/bd_ufv/:campus/:curso", (req, res, next) => {
    db.raw(`SELECT Disciplina.Nome, SUM(Turma.NumEstudantes), SUM(Turma.Aprovados) 
            FROM Campus 
            LEFT JOIN Curso 
            ON Campus.SiglaCamp = Curso.SiglaCamp
            LEFT JOIN Turma
            ON Turma.CodCurso = Curso.CodCurso
            LEFT JOIN Disciplina
            ON Turma.CodDisc = Disciplina.CodDisc
            WHERE Campus.nome = ${req.params.campus} 
            AND Curso.nome = ${req.params.curso}
            GROUP BY Turma.CodDisc, Disciplina.Nome`)
        .then((data) => {
            res.send(data[0]);
        }).catch(err => {
            console.log(err)
            res.send(err);
        })
});

// router.get("/:id", (req, res, next) => {
//     res.status(200).send(`Hello! Parameter: ${req.params.id}`);
// });


module.exports = router;
