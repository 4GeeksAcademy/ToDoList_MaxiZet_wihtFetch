import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [listaDeTareas,setListaDeTareas] = useState(["Bañarse","Limpiar","Aprender React"]) 
	const [nuevaTarea,setNuevaTarea] = useState("")


	return (
		<div className="container mt-5">
			<h1 className="text-center mt-5">Todo List!</h1>
			<div className="">
				<input type="text" className="form-control" placeholder="¿Que necesitas hacer?" value={nuevaTarea} onChange={(evento) => {
						setNuevaTarea(evento.target.value)
					}}
					onKeyDown={(evento) => {
						if (evento.key == "Enter") {
							setListaDeTareas([...listaDeTareas, nuevaTarea]);
							setNuevaTarea("")
						}
					}}
					/>
				<ul className="card">

					{listaDeTareas.map((item,index) => {
						return (
							<li key={index}>
								{item} <i onClick={()=> {
									const aux = listaDeTareas.filter((_task,ind) => {
										return(ind != index)
									})
									setListaDeTareas(aux)
								}} className="fa-solid fa-trash icono-oculto"></i>
							</li>
						)
					})}
				</ul>
				<span>
					{listaDeTareas.length} items left
				</span>
			</div>
		</div>
	);
};

export default Home;
