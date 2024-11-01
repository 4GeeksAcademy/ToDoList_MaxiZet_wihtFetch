import React, {useState, useEffect} from "react";


//create your first component
const Home = () => {

	const [listaDeTareas,setListaDeTareas] = useState(["Bañarse","Limpiar","Aprender React"]) 
	const [nuevaTarea,setNuevaTarea] = useState("")
	
	async function agregarTareas(evento) {
		evento.preventDefault()
		if (tarea != "") {
			setListaDeTareas([...listaDeTareas, nuevaTarea])
			setNuevaTarea("")
		} else {
			alert ("Ingresar Tarea")
		}
		if (evento.key === "Enter") {
			const url = "https://playground.4geeks.com/todo/todos/MaxiZet"
			const resp = await fetch(url,{
				method:"POST",
				headers: {
					'Content-Type': 'application/json'
				  },
				  body: JSON.stringify({
					label: nuevaTarea,
					is_done: false
				  })
			})
			if (resp.ok) {
				cargarTareas()
				return true
			}
		}
	}

	const crearUsuario = async () => {
		try {
			const resp = await fetch("https://playground.4geeks.com/todo/users/MaxiZet", {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
			})
			if (resp.status == 201) {
				cargarTareas()
			}
		} catch (error) {
			console.log(error)
			return false
		}
	}
	
	
	
	useEffect(()=> {
		const cargarTareas = async () => {
			const url = "https://playground.4geeks.com/todo/users/MaxiZet"
			const resp = await fetch(url)
			const data = await resp.json()
			setListaDeTareas(data.todos) 
		}
		cargarTareas()
	},[])

	return (
		<div className="container mt-5 bg-primary bg-gradient">
			<h1 className="text-center mt-5 text-light">To do List!</h1>
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
				<ul className="card text-light bg-dark bg-gradient">

					{listaDeTareas.map((item,index) => {
						return (
							<li key={index}>
								{item.label} <i onClick={()=> {
									const aux = listaDeTareas.filter((_task,ind) => {
										return(ind != index)
									})
									setListaDeTareas(aux)
								}} className="fa-solid fa-trash icono-oculto"></i>
							</li>
						)
					})}
				</ul>
				<div className="d-flex justify-content-between text-light">
				<span>
					{listaDeTareas.length} items left
				</span>
				<br />
				<span>
					{(listaDeTareas.length == 0)?"No hay tareas, añadir tareas" : ""}
				</span>
				</div>
			</div>
		</div>
	);
};

export default Home;
