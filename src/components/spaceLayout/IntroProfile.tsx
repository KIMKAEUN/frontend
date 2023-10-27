import styled from "styled-components";
import IntroBackGround from "./intro/IntroBackGround";
import IntroProfileImg from "./intro/IntroProfileImg";
import IntroProfileText from "./intro/IntroProfileText";

const IntroProfile = () => {
  return (
    <Wrapper>
      <IntroBackGround />
      <IntroProfileImg />
      <IntroProfileText />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  gap: 70px;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
`;

export default IntroProfile;
