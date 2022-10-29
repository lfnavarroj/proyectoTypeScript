import { Aprendiz, NivelEducativo } from './aprendiz.js';
import { Curso } from './curso.js';
var cursos = [new Curso("Curso #1", 30, 90, true, 2019),
    new Curso("Curso #2", 20, 90, true, 2019),
    new Curso("Curso #3", 40, 60, true, 2019),
    new Curso("Curso #4", 60, 90, true, 2019)];
export var ap = new Aprendiz("Luis Felipe", "Navarro Julio", "avatar.png", 34, NivelEducativo.POSGRADO, cursos);
console.log(ap.cursos);
var apredizTable = document.getElementById("aprendiz");
var estadisticasTable = document.getElementById("estadisticas");
var cursosTable = document.getElementById("cursos");
var botoFiltro = document.getElementById("boton-filtro");
var textoBusqueda = document.getElementById("texto-busqueda");
botoFiltro.onclick = function () {
    var text = textoBusqueda.value;
    text = (text == null) ? "" : text;
    cursosTable.getElementsByTagName("tbody")[0].remove();
    var cursosFiltrados = ap.cursos.filter(function (c) { return c.nombre.match(text); });
    mostrarCursosAprendiz(cursosFiltrados);
};
mostrarDatosAprendiz(ap);
mostrarEstadisticas(ap);
mostrarCursosAprendiz(ap.cursos);
// function filtrarPorNombre():void{
//     let text:string=textoBusqueda.value;
//     text=(text==null)?"":text;
//     cursosTable.getElementsByTagName("tbody")[0].remove();
//     let cursosFiltrados:Curso[]=ap.cursos.filter(function(c){return c.nombre.match(text);})
//     mostrarCursosAprendiz(cursosFiltrados);
// }
function mostrarDatosAprendiz(aprendiz) {
    var tbodyAprendiz = document.createElement("tbody");
    tbodyAprendiz.innerHTML = "<tr><td colspan=2><img src=\"./" + aprendiz.avatar + "\" height=\"100\"></td></tr>\n    <tr><td>Nombre:</td><td>" + aprendiz.nombres + "</td></tr>\n    <tr><td>Apellidos:</td><td>" + aprendiz.apellidos + "</td></tr>\n    <tr><td>Nivel educativo:</td><td>" + aprendiz.nivelEducativo + "</td></tr>\n    <tr><td>Edad:</td><td>" + aprendiz.edad + "</td></tr>";
    apredizTable.appendChild(tbodyAprendiz);
}
function mostrarEstadisticas(aprendiz) {
    var numeroCertificados = aprendiz.darCursosCertificados();
    var trElement = document.createElement('tr');
    trElement.innerHTML = "<td><b>Cursos certificados</b><td>" + numeroCertificados + "</td>";
    estadisticasTable.appendChild(trElement);
}
function mostrarCursosAprendiz(cursos) {
    var cursosTbody = document.createElement("tbody");
    var estado = cursos.map(function (c) { return (c.calificacion > 60) ? 'green' : 'red'; });
    var index = 0;
    for (var _i = 0, cursos_1 = cursos; _i < cursos_1.length; _i++) {
        var curso = cursos_1[_i];
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + curso.nombre + "</td>\n        <td>" + curso.horas + "</td>\n        <td style=\"color:" + estado[index] + "\">" + curso.calificacion + "</td>\n        <td>" + curso.certificado + "</td>\n        <td>" + curso.anio + "</td>";
        cursosTbody.appendChild(trElement);
        index++;
    }
    cursosTable.appendChild(cursosTbody);
}
