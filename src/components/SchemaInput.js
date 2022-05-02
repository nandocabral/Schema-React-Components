import { get } from "lodash";
const SchemaInput = ({ schema, key, value }) => {
  const widgetProps = get(schema, "widget.props");

  return (
    <div id={`schema-${key}`} className="schema-input">
      <label className="schema-input__label" htmlFor={key}>
        {schema.title}
      </label>
      <input id={key} name={key} value={value} {...widgetProps} />
      <span className="schema-input__help">{schema.description}</span>
    </div>
  );
};
export default SchemaInput;
