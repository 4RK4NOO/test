import { useEffect, useState } from "react";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../api/courses";
import { futuristicTheme } from "../theme/futuristic";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);

  const fetchCourses = async () => {
    setCourses(await getCourses());
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateCourse(editing.id, { name });
      setEditing(null);
    } else {
      await createCourse({ name });
    }
    setName('');
    fetchCourses();
  };

  const handleEdit = (course) => {
    setEditing(course);
    setName(course.name);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este curso?")) {
      await deleteCourse(id);
      fetchCourses();
    }
  };

  return (
    <div className="p-8">
      <h2 className={`${futuristicTheme.title} mb-4`}>Cursos</h2>
      <form className="mb-6 flex gap-4 items-end" onSubmit={handleSubmit}>
        <input
          className={futuristicTheme.input}
          type="text"
          placeholder="Nombre del curso"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className={futuristicTheme.button} type="submit">
          {editing ? "Actualizar" : "Agregar"}
        </button>
        {editing && (
          <button className={futuristicTheme.button} type="button" onClick={() => { setEditing(null); setName(''); }}>
            Cancelar
          </button>
        )}
      </form>
      <table className="min-w-full bg-card shadow-neon rounded-xl overflow-hidden">
        <thead>
          <tr>
            <th className="p-4 text-left text-primary">ID</th>
            <th className="p-4 text-left text-primary">Nombre</th>
            <th className="p-4 text-left text-primary">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id} className="border-b border-accent">
              <td className="p-4">{c.id}</td>
              <td className="p-4">{c.name}</td>
              <td className="p-4 flex gap-2">
                <button className={futuristicTheme.button} onClick={() => handleEdit(c)}>Editar</button>
                <button className={`${futuristicTheme.button} bg-red-500`} onClick={() => handleDelete(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}