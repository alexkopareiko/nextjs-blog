export const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">

      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
        {touched &&
          ((error && <p className="text-red-500 text-xs italic">{error}</p>) ||
            (warning && <p className="text-indigo-600 text-xs italic">{warning}</p>))}
      </div>
      </div>
    </div>
  )