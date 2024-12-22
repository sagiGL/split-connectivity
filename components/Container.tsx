// components/Container.tsx
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  .new-window-btn {
    display: none; // Initially hide the button
  }
  &:hover .new-window-btn {
    display: flex; // Show the button on hover
  }
`;

export default Container;
