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

## React.cloneElement en Container Components

### ¿Qué es React.cloneElement?

`React.cloneElement` es una función de React que permite clonar un elemento React existente y pasarle props adicionales. En el contexto de container components, se usa para inyectar datos a múltiples componentes hijos de forma automática.

### Ejemplo de implementación

```jsx
const DataSource = ({ getData = () => {}, resourceName, children }) => {
    const [resource, setResource] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await getData();
            setResource(data);
        })();
    }, [getData]);

    return (
        <>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { [resourceName]: resource });
                }
                return child;
            })}
        </>
    );
};
```

### Ventajas de React.cloneElement

- **Automatización**: Pasa datos a múltiples hijos sin necesidad de especificar cada uno
- **Flexibilidad**: El nombre de la prop es dinámico (`resourceName`)
- **Patrón establecido**: Implementación clásica del patrón Container/Presentational
- **Reutilización**: Cualquier componente hijo puede recibir datos sin conocer la fuente

### Consideraciones y alternativas

#### React Context (Recomendado para proyectos grandes)

```jsx
const DataContext = React.createContext();

const DataSource = ({ getData, resourceName, children }) => {
    const [resource, setResource] = useState(null);
    
    useEffect(() => {
        (async () => {
            const data = await getData();
            setResource(data);
        })();
    }, [getData]);
    
    return (
        <DataContext.Provider value={{ [resourceName]: resource }}>
            {children}
        </DataContext.Provider>
    );
};

// Uso en componentes hijos
const ChildComponent = () => {
    const { user } = useContext(DataContext);
    return <div>{user.name}</div>;
};
```

#### Render Props (Alternativa clásica)

```jsx
const DataSource = ({ getData, resourceName, children }) => {
    const [resource, setResource] = useState(null);
    
    useEffect(() => {
        (async () => {
            const data = await getData();
            setResource(data);
        })();
    }, [getData]);
    
    return children({ [resourceName]: resource });
};

// Uso
<DataSource getData={fetchUser} resourceName="user">
    {({ user }) => <UserProfile user={user} />}
</DataSource>
```

#### Custom Hooks (Más directo para casos simples)

```jsx
const useDataSource = (getData) => {
    const [resource, setResource] = useState(null);
    
    useEffect(() => {
        (async () => {
            const data = await getData();
            setResource(data);
        })();
    }, [getData]);
    
    return resource;
};

// Uso
const UserProfile = () => {
    const user = useDataSource(fetchUser);
    return <div>{user.name}</div>;
};
```

### Cuándo usar cada enfoque

- **React.cloneElement**: Proyectos pequeños, cuando necesitas pasar datos a múltiples hijos automáticamente
- **React Context**: Proyectos grandes, estado global, múltiples niveles de componentes
- **Render Props**: Cuando necesitas control granular sobre cómo se renderizan los datos
- **Custom Hooks**: Casos simples, lógica de datos específica para un componente

## Render Props vs React.cloneElement

### ¿Qué son los Render Props?

Los Render Props son un patrón donde un componente recibe una función como prop (típicamente llamada `render`) y la ejecuta con los datos que maneja. Es una forma de compartir lógica entre componentes usando una prop cuya función es renderizar algo.

### Ejemplo de implementación con Render Props

```jsx
const DataSourceWithRenderProps = ({ getData = () => {}, render }) => {
    const [resource, setResource] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await getData();
            setResource(data);
        })();
    }, [getData]);
    
    return render(resource);
};

// Uso:
<DataSourceWithRenderProps 
    getData={fetchUser} 
    render={(user) => <UserProfile user={user} />} 
/>
```

### Diferencias principales entre Render Props y React.cloneElement

#### 1. Control del renderizado

**Render Props:**
- Control total sobre cómo se renderiza el componente
- Puedes hacer cualquier transformación de datos antes del renderizado
- Más explícito sobre qué se está renderizando

**React.cloneElement:**
- Renderizado automático, sin control granular
- Los datos se pasan directamente como props
- Más declarativo, los hijos "reciben" datos automáticamente

#### 2. Flexibilidad

**Render Props:**
```jsx
<DataSourceWithRenderProps 
    getData={fetchUser} 
    render={(user) => (
        <div>
            {user ? (
                <>
                    <UserProfile user={user} />
                    <UserStats user={user} />
                    <UserActions user={user} />
                </>
            ) : (
                <LoadingSpinner />
            )}
        </div>
    )} 
/>
```

**React.cloneElement:**
```jsx
<DataSource getData={fetchUser} resourceName="user">
    <UserProfile />
    <UserStats />
    <UserActions />
</DataSource>
```

#### 3. Múltiples componentes hijos

**Render Props:**
- Necesitas manejar múltiples componentes manualmente
- Más código pero más control
- Ideal para casos complejos con lógica condicional

**React.cloneElement:**
- Automáticamente pasa datos a todos los hijos
- Menos código, más automático
- Ideal para casos simples con múltiples hijos

#### 4. Sintaxis y legibilidad

**Render Props:**
- Más explícito, ves exactamente qué se está renderizando
- Puede ser más verboso
- Mejor para casos donde necesitas lógica compleja

**React.cloneElement:**
- Más declarativo, los hijos "reciben" datos automáticamente
- Sintaxis más limpia para casos simples
- Mejor para casos donde la lógica es directa

### Cuándo usar cada patrón

#### Render Props es mejor cuando:
- Necesitas transformar datos antes de pasarlos
- Quieres control granular sobre el renderizado
- Solo tienes un componente hijo o pocos
- Necesitas lógica condicional compleja
- Quieres ser explícito sobre qué se renderiza

#### React.cloneElement es mejor cuando:
- Tienes múltiples componentes hijos que necesitan los mismos datos
- Quieres que el patrón sea "invisible" para los componentes hijos
- Los datos se pasan directamente sin transformación
- Buscas una API más declarativa
- Prefieres menos código y más automatización

### Ejemplo comparativo completo

```jsx
// Con Render Props - más control, más explícito
<DataSourceWithRenderProps 
    getData={fetchUser} 
    render={(user) => {
        if (!user) return <LoadingSpinner />;
        return (
            <div className="user-container">
                <UserProfile user={user} />
                <UserStats user={user} />
                {user.isAdmin && <AdminPanel user={user} />}
            </div>
        );
    }} 
/>

// Con React.cloneElement - más automático, más declarativo
<DataSource getData={fetchUser} resourceName="user">
    <UserProfile />
    <UserStats />
    <AdminPanel />
</DataSource>
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

