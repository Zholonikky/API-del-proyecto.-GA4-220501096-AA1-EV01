const express = require('express');
const app = express();
app.use(express.json());
const estudiantes=[
    {id: 1, nombre: 'David', edad: 22 , inscrito: true},
    {id: 2, nombre: 'Nickolas', edad: 23 , inscrito: true},
    {id: 3, nombre: 'Maria', edad: 33 , inscrito: true},
    {id: 4, nombre: 'Martin', edad: 31 , inscrito: true}
];
app.get('/',(req, res)=>{
    res.send('api del prejecto');
});
app.get('/api/estudiantes', (req, res) =>{
    res.send(estudiantes);
});
app.get('/api/estudiantes/:id', (req, res)=>{
    const estudiante = estudiantes.find(c => c.id === parseInt(req.params.id));
    if(!estudiante) return res.status(404).send('estudiante no encontrado');
    else res.send(estudiante);
});
app.post('/api/estudiantes', (req, res) =>{
    const estudiante = {
        id: estudiantes.length + 1,
        nombre: req.body.nombre,
        edad: parseInt(req.body.edad),
        inscrito: (req.body.inscrito === 'true')
    };
    estudiantes.push(estudiante);
    res.send(estudiante);
});
app.delete('/api/estudiantes/:id', (req, res) =>{
    const estudiante = estudiantes.find(c => c.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).send('Estudiante no enconntrado');
    const index = estudiantes.indexOf(estudiante);
    estudiantes.splice(index, 1);
    res.send(estudiante);
});
const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));