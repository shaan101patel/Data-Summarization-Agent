"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

interface NoDatasetModalProps {
  show: boolean;
}

export function NoDatasetModal({ show }: NoDatasetModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (show) {
      // Auto-redirect after 3 seconds
      const timeout = setTimeout(() => {
        router.push("/");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [show, router]);

  if (!show) return null;

  return (
    <Overlay role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <Modal>
        <IconWrapper aria-hidden="true">⚠️</IconWrapper>
        <ModalTitle id="modal-title">No Dataset Selected</ModalTitle>
        <ModalMessage>
          Please return to the upload page and choose a dataset before viewing hosts.
        </ModalMessage>
        <ModalMessage>
          Redirecting to upload page in 3 seconds...
        </ModalMessage>
        <ModalActions>
          <PrimaryButton onClick={() => router.push("/")}>
            Go to Upload Page
          </PrimaryButton>
        </ModalActions>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(8)};
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  text-align: center;
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  line-height: 1;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ModalMessage = styled.p`
  margin: 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const ModalActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.accentContrast};
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;
