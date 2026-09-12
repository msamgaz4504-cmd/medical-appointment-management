function Input({ title, type, description, value, onChange }) {
    return (
        <div className="div-field">
            <label className="label-field" htmlFor={title}>{title}</label>
            <input 
                type={type} 
                id={title} 
                name={title} 
                placeholder={description}
                className="input-field"
                required
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;