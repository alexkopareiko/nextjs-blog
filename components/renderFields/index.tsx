export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  width
}) => (
  <div className={`mb-6 ${width} `}>
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
      {touched &&
        ((error && <p className="text-red-500 text-xs italic">{error}</p>) ||
          (warning && <p className="text-indigo-600 text-xs italic">{warning}</p>))}
    </div>
  </div>
)

export const selectField = (formValues) => {
  const { input, label, meta, options, idField, nameField, warning} = formValues;
  const { touched, error } = meta;

  return (
    <div className="w-full md:w-1/2 mb-6">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
      <div className="relative">
        <select {...input} name={label} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
          <option value="none">Please select...</option>
          {
            options && options.size > 0 ? options.valueSeq().map((option) => <option value={option.get(idField)} key={option.get(idField)}>{option.get(nameField)}</option>) : ''
          }
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      {touched &&
          ((error && <p className="text-red-500 text-xs italic">{error}</p>) ||
            (warning && <p className="text-indigo-600 text-xs italic">{warning}</p>))}
    </div>
  );

}