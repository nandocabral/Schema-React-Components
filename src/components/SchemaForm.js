import { useState, useEffect, lazy, Suspense } from "react";
import { get } from "lodash";

const SchemaForm = ({
  schema = {},
  value = {},
  fallback = <p>Cargando...</p>,
  children,
}) => {
  const [components, SetComponents] = useState([]);
  const [fieldNames] = useState(Object.keys(schema.properties || {}));
  useEffect(() => {
    async function loadComponentsBySchema() {
      const componentPromises = fieldNames.map(async (key) => {
        // schema
        const compBySchema = get(
          schema,
          `properties[${key}].widget.type`,
          "SchemaInput"
        );
        const data = get(schema, `properties[${key}]`, {});
        console.log(data, compBySchema);
        const DynComponent = lazy(() =>
          import(`./${compBySchema}`).then((comp) => comp)
        );
        return <DynComponent key={key} schema={data} value={value[key]} />;
      });

      Promise.all(componentPromises).then(SetComponents);
    }

    loadComponentsBySchema();
  }, [schema.properties]);

  return (
    <div className="schema-form__grid">
      <legend className="schema-form__title">{schema.title}</legend>
      <Suspense fallback={fallback}>{components}</Suspense>
      {children}
    </div>
  );
};

export default SchemaForm;
