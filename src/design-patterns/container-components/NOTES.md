# Design patterns

Los patrones de diseño se pueden definir como soluciones efectivas para desafíos de desarrollo comunes, es decir problemas comunes. Representan la solución más óptima y efectiva para estos desafíos.

# Container Components

Los componentes contenedores en esencia son componentes responsables del manejo del data loading y data management en nombre de sus componentes hijos. Estos componentes suelen agrupar muchos componentes hijos y el reto está cuando todos estos componentes hijos tienen que compartir la misma lógica del fetching de la data. El componente contenedor maneja todo lo relacionado con el proceso de llamado y se lo pasa a sus hijos.

> Los componentes desconocen la fuente o la gestión de sus datos

## Características principales

- **Separación de responsabilidades**: Los container components manejan la lógica de datos, mientras que los presentational components se enfocan en la UI
- **Reutilización**: Un container puede servir a múltiples componentes presentacionales
- **Testabilidad**: Es más fácil testear la lógica de datos separada de la UI
- **Mantenibilidad**: Cambios en la lógica de datos no afectan la UI

## Funcionalidades que manejan

Los container components no solo manejan fetching, sino también:
- Estado global
- Lógica de negocio
- Transformación de datos
- Manejo de errores
- Caching
- Side effects

## Ejemplo práctico

```jsx
// Container Component
const UserContainer = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchUser()
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  
  return <UserProfile user={user} loading={loading} error={error} />;
};

// Presentational Component
const UserProfile = ({ user, loading, error }) => {
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <div>{user.name}</div>;
};
```

## Alternativas modernas

### Custom Hooks
Muchos desarrolladores prefieren custom hooks sobre container components:

### Render Props y HOCs
Patrones relacionados que también separan lógica de presentación.

### Context API
Para estado global, React Context puede ser una alternativa a los container components.

## Cuándo usar Container Components

- Cuando necesitas compartir lógica de datos entre múltiples componentes
- Para manejar estado complejo que afecta a varios componentes hijos
- Cuando quieres mantener los componentes presentacionales puros
- Para encapsular lógica de negocio compleja

