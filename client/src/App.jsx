import {useEffect, useState} from "react";
import {todos} from "./services/todos";

export default function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');


useEffect(() => {
  (async() => {
    try {
      setLoading(true);
      const data = await todos.list();
      setItems(data.map(t => ({ id: t.id || t._id, text: t.text, done: !!t.done})));
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  })();
}, []);

async function onAdd(e){
  e.preventDefault();
  if(!text.trim()) return;
  try{
    const created = await todos.create(text.trim());
    const normalization = {
      id: created.id || created._id,
      text: created.text,
      done: !!created.done
    };
    setItems(prev =>[normalization, ...prev]);
    setText("");
  } catch (e) {
    setErr(e.message);
  }
};

async function onToggle (id, done){
  try{
    setItems(prev =>  prev.map(t => t.id === id ? {...t, done} : t));
    await todos.toggle(id, {done});
  } catch (e) {
    setErr(e.message);
  }
};

async function onDelete (id){
  try{
    setItems(prev =>  prev.filter(t => t.id !== id));
    await todos.remove(id);
  } catch (e) {
    setErr(e.message);
  }
};

return (
    <div style={{ maxWidth: 560, margin: '40px auto', padding: 16 }}>
      <h1>My Todos</h1>

      <form onSubmit={onAdd} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
       
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add todo..."
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Add</button>
      </form>

      {loading && <p>Loading…</p>}
      {err && <p style={{ color: 'crimson' }}>{err}</p>}

      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
        {items.map(t => (
          <li key={t.id} text={t.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              text={text}
              type="checkbox"
              checked={t.done}
              onChange={e => onToggle(t.id, e.target.checked)}
            />
            <span style={{ textDecoration: t.done ? 'line-through' : 'none', flex: 1 }}>
              {t.text}
            </span>
            <button onClick={() => onDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
  }