# Design Patterns: Controlled and Uncontrolled Components

Los patrones de diseño se pueden definir como soluciones efectivas para desafíos de desarrollo comunes, es decir problemas comunes. Representan la solución más óptima y efectiva para estos desafíos.

# Controlled and Uncontrolled Components

Los componentes en React pueden ser clasificados en dos categorías principales según cómo manejan su estado: **Controlled Components** y **Uncontrolled Components**. Esta distinción es fundamental para entender cómo los componentes interactúan con el estado y los datos.

## Uncontrolled Component Concept

Los componentes uncontrolled son aquellos donde los componentes manejan su propio estado interno y la data dentro del componente típicamente es accesible solamente cuando un evento específico ocurre.

### Características principales

- **Estado interno**: El componente maneja su propio estado usando `useState` o `useRef`
- **Acceso limitado**: Los datos solo son accesibles en momentos específicos (submit, blur, etc.)
- **Menos control**: El componente padre tiene menos control sobre el comportamiento
- **Simplicidad**: Más simple de implementar para casos básicos

### Ejemplo práctico

```jsx
// Uncontrolled Component
const UncontrolledForm = () => {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Los datos solo son accesibles aquí
        console.log('Name:', nameRef.current.value);
        console.log('Email:', emailRef.current.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input ref={nameRef} type="text" placeholder="Name" />
            <input ref={emailRef} type="email" placeholder="Email" />
            <button type="submit">Submit</button>
        </form>
    );
};
```

### Ventajas de Uncontrolled Components

- **Simplicidad**: Menos código para implementar
- **Performance**: Menos re-renders ya que no hay estado en el padre
- **Flexibilidad**: El componente es más autónomo
- **Menos prop drilling**: No necesitas pasar callbacks hacia abajo

### Desventajas de Uncontrolled Components

- **Menos control**: Difícil de controlar desde el componente padre
- **Testing complejo**: Más difícil de testear ya que el estado es interno
- **Validación limitada**: No puedes validar en tiempo real
- **Acceso limitado**: Los datos solo están disponibles en eventos específicos

## Controlled Component Concept

Son componentes los cuales su componente padre es responsable del manejo del estado y el cual es enviado abajo para el control del componente como props. El componente padre maneja el estado y controla el comportamiento del controlled component. Suelen no tener un `useState` propio.

### Características principales

- **Estado en el padre**: El estado se maneja en el componente padre
- **Props controladas**: Los valores se pasan como props (`value`, `onChange`)
- **Control total**: El componente padre tiene control completo sobre el comportamiento
- **Predictibilidad**: El comportamiento es más predecible y controlable

### Ejemplo práctico

```jsx
// Controlled Component
const ControlledForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Name"
            />
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
            />
            <button type="submit">Submit</button>
        </form>
    );
};
```

### Ventajas de Controlled Components

- **Control total**: El componente padre tiene control completo
- **Validación en tiempo real**: Puedes validar mientras el usuario escribe
- **Testing fácil**: Más fácil de testear ya que el estado es explícito
- **Predictibilidad**: El comportamiento es más predecible
- **Reutilización**: Más fácil de reutilizar con diferentes lógicas

### Desventajas de Controlled Components

- **Más código**: Requiere más código para implementar
- **Performance**: Puede causar más re-renders
- **Prop drilling**: Puede requerir pasar muchas props hacia abajo
- **Complejidad**: Puede ser más complejo para casos simples

## Comparación detallada

### Control del estado

**Uncontrolled:**
```jsx
const UncontrolledInput = () => {
    const inputRef = useRef();
    
    const handleClick = () => {
        console.log(inputRef.current.value); // Solo accesible aquí
    };
    
    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={handleClick}>Get Value</button>
        </div>
    );
};
```

**Controlled:**
```jsx
const ControlledInput = () => {
    const [value, setValue] = useState('');
    
    const handleClick = () => {
        console.log(value); // Siempre accesible
    };
    
    return (
        <div>
            <input 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text" 
            />
            <button onClick={handleClick}>Get Value</button>
        </div>
    );
};
```

### Validación

**Uncontrolled (limitada):**
```jsx
const UncontrolledForm = () => {
    const emailRef = useRef();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        // Solo puedes validar en submit
        if (!email.includes('@')) {
            alert('Invalid email');
            return;
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input ref={emailRef} type="email" />
            <button type="submit">Submit</button>
        </form>
    );
};
```

**Controlled (tiempo real):**
```jsx
const ControlledForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        
        // Validación en tiempo real
        if (value && !value.includes('@')) {
            setError('Invalid email format');
        } else {
            setError('');
        }
    };
    
    return (
        <form>
            <input 
                value={email}
                onChange={handleEmailChange}
                type="email" 
            />
            {error && <span style={{color: 'red'}}>{error}</span>}
            <button type="submit" disabled={!!error}>Submit</button>
        </form>
    );
};
```

## Cuándo usar cada patrón

### Usa Uncontrolled Components cuando:

- **Casos simples**: Formularios básicos sin validación compleja
- **Performance crítica**: Cuando necesitas minimizar re-renders
- **Componentes autónomos**: Cuando el componente debe ser completamente independiente
- **Integración con librerías**: Cuando usas librerías que requieren refs (como react-select)
- **Casos de uso específicos**: File inputs, componentes de terceros

### Usa Controlled Components cuando:

- **Validación compleja**: Necesitas validación en tiempo real
- **Control granular**: Necesitas control total sobre el comportamiento
- **Testing importante**: Cuando la testabilidad es una prioridad
- **Lógica de negocio**: Cuando necesitas aplicar lógica compleja
- **Formularios complejos**: Formularios con múltiples campos interdependientes
- **Reutilización**: Cuando necesitas reutilizar el componente con diferentes lógicas

## Ejemplos avanzados

### Formulario complejo con validación

```jsx
const ComplexForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    
    const validateField = (name, value) => {
        switch (name) {
            case 'username':
                if (value.length < 3) return 'Username must be at least 3 characters';
                if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
                break;
            case 'password':
                if (value.length < 8) return 'Password must be at least 8 characters';
                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    return 'Password must contain uppercase, lowercase, and number';
                }
                break;
            case 'confirmPassword':
                if (value !== formData.password) return 'Passwords do not match';
                break;
        }
        return '';
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Validación en tiempo real
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };
    
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };
    
    const isFormValid = Object.keys(errors).every(key => !errors[key]) &&
                       Object.keys(formData).every(key => formData[key]);
    
    return (
        <form>
            <div>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Username"
                />
                {touched.username && errors.username && (
                    <span style={{color: 'red'}}>{errors.username}</span>
                )}
            </div>
            
            <div>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    placeholder="Email"
                />
                {touched.email && errors.email && (
                    <span style={{color: 'red'}}>{errors.email}</span>
                )}
            </div>
            
            <div>
                <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    placeholder="Password"
                />
                {touched.password && errors.password && (
                    <span style={{color: 'red'}}>{errors.password}</span>
                )}
            </div>
            
            <div>
                <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    placeholder="Confirm Password"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                    <span style={{color: 'red'}}>{errors.confirmPassword}</span>
                )}
            </div>
            
            <button type="submit" disabled={!isFormValid}>
                Submit
            </button>
        </form>
    );
};
```

### Componente híbrido (uncontrolled con controlled features)

```jsx
const HybridComponent = () => {
    const inputRef = useRef();
    const [isValid, setIsValid] = useState(true);
    
    const handleBlur = () => {
        const value = inputRef.current.value;
        // Validación solo en blur (uncontrolled)
        setIsValid(value.length >= 3);
    };
    
    return (
        <div>
            <input
                ref={inputRef}
                onBlur={handleBlur}
                placeholder="Enter text (min 3 chars)"
            />
            {!isValid && (
                <span style={{color: 'red'}}>
                    Must be at least 3 characters
                </span>
            )}
        </div>
    );
};
```

## Mejores prácticas

### Para Controlled Components

1. **Usa un solo estado**: Agrupa campos relacionados en un objeto
2. **Validación temprana**: Valida en tiempo real cuando sea posible
3. **Debounce**: Para validaciones costosas, usa debounce
4. **Memoización**: Usa `useMemo` para validaciones complejas
5. **Custom hooks**: Extrae lógica de formularios a custom hooks

### Para Uncontrolled Components

1. **Acceso limitado**: Solo accede a los datos cuando sea necesario
2. **Eventos específicos**: Usa eventos como `onSubmit`, `onBlur`, `onChange`
3. **Refs apropiadas**: Usa `useRef` para acceder a valores
4. **Integración**: Ideal para integrar con librerías de terceros

## Conclusión

Los Controlled Components en la mayoría de los casos son la opción preferida. Hay muchas razones por esta preferencia:

- **Tienden a ser más usables y fáciles de testear**
- **Ofrecen control total sobre el comportamiento**
- **Permiten validación en tiempo real**
- **Son más predecibles y mantenibles**
- **Facilitan la reutilización de componentes**

Sin embargo, los Uncontrolled Components tienen su lugar en casos específicos donde la simplicidad y performance son más importantes que el control granular. La elección entre ambos patrones debe basarse en los requisitos específicos de tu aplicación y el contexto de uso.