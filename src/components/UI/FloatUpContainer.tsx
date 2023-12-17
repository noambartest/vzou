import styles from "./FloatUpContainer.module.css";


type Props = { children: React.ReactNode };

const FloatUpContainer: React.FC<Props> = ({ children }) => (
  <div className={styles.form_card}>{children}</div>
);

export default FloatUpContainer;
