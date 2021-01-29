import * as React from "react";
import db from '../../../db.json'
import styled from "styled-components";
import { motion } from "framer-motion";
import { Check, Error } from "styled-icons/material";

const Base = styled(motion.div)`
  display: flex;
  color: rgba(0, 0, 0);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.45);
  overflow: hidden;
  width: 300px;
  margin-bottom: 14px;
  box-shadow: 3px 3px 15px 0px rgba(0, 0, 0, 0.25);
`;

const Main = styled.div`
  padding: 10px 18px 14px 20px;
  display: flex;
  flex: 1;

  & > div:first-child {
    margin-right: 20px;
  }
`;

const Title = styled.div`
  line-height: 1.3;
  font-weight: bold;
  font-size: 18px;
`;

const Buttons = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;

  & > button:not(:first-child) {
    border-top: 1px solid #404040;
  }
`;

const Button = styled.button`
  pointer-events: all;
  transition: background-color 0.15s ease-in-out;
  flex: 1;
  padding: 8px;
  background-color: rgb(255, 255, 255, 0.75);
  outline: 0;
  border: 0;
  color: rgb(0, 0, 0);
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: rgb(255, 255, 255, 1);
  }
`;

function getIcon(notificationType) {
  if (notificationType === "error") {
    return {
      Icon: Error,
      iconColor: db.theme.colors.wrong
    };
  }

  return {
    Icon: Check,
    iconColor: db.theme.colors.success
  };
}

function Notification({ title, type, onClose }) {
  const { Icon, iconColor } = getIcon(type);

  return (
    <Base
      initial={{ opacity: 0, scale: 0.8, x: -600, y: -100 }}
      animate={{ opacity: 1, scale: 1, x: -600, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -600, y: -100  }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 40
      }}
      positionTransition
    >
      <Main>
        <div>
          <Icon size={32} style={{ color: iconColor }} />
        </div>
        <div>
          <Title>{title}</Title>
        </div>
      </Main>
      <Buttons>
        <Button onClick={onClose}>Fechar</Button>
      </Buttons>
    </Base>
  );
}

export default Notification;
