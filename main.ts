import {Aprendiz,NivelEducativo} from './aprendiz.js'
import {Curso} from './curso.js';

let cursos=[new Curso("Curso #1",30,90,true,2019),
            new Curso("Curso #2",20,90,true,2019),
            new Curso("Curso #3",40,60,true,2019),
            new Curso("Curso #4",60,90,true,2019)]


export const ap=new Aprendiz("Luis Felipe","Navarro Julio","avatar.png",34,NivelEducativo.POSGRADO,cursos);
console.log(ap.cursos);

let apredizTable:HTMLElement=document.getElementById("aprendiz")!;
let estadisticasTable:HTMLElement=document.getElementById("estadisticas")!;
let cursosTable:HTMLElement=document.getElementById("cursos")!;
let botoFiltro:HTMLElement=document.getElementById("boton-filtro")!;
let textoBusqueda:HTMLInputElement=<HTMLInputElement>document.getElementById("texto-busqueda")!;

botoFiltro.onclick=()=>{
    let text:string=textoBusqueda.value;
    text=(text==null)?"":text;
    cursosTable.getElementsByTagName("tbody")[0].remove();
    let cursosFiltrados:Curso[]=ap.cursos.filter((c)=> c.nombre.match(text));
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

function mostrarDatosAprendiz(aprendiz:Aprendiz):void{
    let tbodyAprendiz=document.createElement("tbody");
    tbodyAprendiz.innerHTML=`<tr><td colspan=2><img src="./${aprendiz.avatar}" height="100"></td></tr>
    <tr><td>Nombre:</td><td>${aprendiz.nombres}</td></tr>
    <tr><td>Apellidos:</td><td>${aprendiz.apellidos}</td></tr>
    <tr><td>Nivel educativo:</td><td>${aprendiz.nivelEducativo}</td></tr>
    <tr><td>Edad:</td><td>${aprendiz.edad}</td></tr>`
    apredizTable.appendChild(tbodyAprendiz);
}

function  mostrarEstadisticas(aprendiz:Aprendiz):void{
    let numeroCertificados :number=aprendiz.darCursosCertificados();
    let trElement:HTMLElement=document.createElement('tr');
    trElement.innerHTML=`<td><b>Cursos certificados</b><td>${numeroCertificados}</td>`;
    estadisticasTable.appendChild(trElement);
}

function mostrarCursosAprendiz(cursos:Curso[]):void{
    let cursosTbody:HTMLElement=document.createElement("tbody");
    let estado:string[]=cursos.map(c=>(c.calificacion>60)?'green':'red');
    let index:number=0;
    for(let curso of cursos){
        let trElement:HTMLElement=document.createElement("tr");
        trElement.innerHTML=`<td>${curso.nombre}</td>
        <td>${curso.horas}</td>
        <td style="color:${estado[index]}">${curso.calificacion}</td>
        <td>${curso.certificado}</td>
        <td>${curso.anio}</td>`;
        cursosTbody.appendChild(trElement);
        index++;
    }
    cursosTable.appendChild(cursosTbody);
}