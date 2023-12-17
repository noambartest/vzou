interface Props {
  name: string;
  src: string;
  width: string;
}

export function SubjectImg(props: Props) {
  return (
    <img
      src={props.src}
      style={{
        paddingTop: "10px",
        width: props.width,
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
      }}
      alt={props.name}
    />
  );
}
