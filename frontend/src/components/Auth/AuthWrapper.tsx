import AuthCard from "./AuthCard";

import FloatUpContainer from "../UI/FloatUpContainer";


function AuthWrapper(props: any) {
  return (
    <>
      <FloatUpContainer>
        <AuthCard title={props.cardTitle}>{props.cardContent}</AuthCard>
      </FloatUpContainer>

      <FloatUpContainer>{props.imgContent}</FloatUpContainer>
    </>
  );
}

export default AuthWrapper;
