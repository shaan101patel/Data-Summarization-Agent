import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";

/**
 * Dashboard top bar with search affordance and quick actions. Shareable across pages.
 */
export function TopBar() {
  return (
    <Bar>
      <Search role="search">
        <MagnifyingGlassIcon width={20} />
        <input type="search" placeholder="Search Censys data using natural language or syntax…" />
      </Search>
      <Actions>
        <ActionButton type="button" aria-label="View notifications">
          <BellIcon width={20} />
        </ActionButton>
        <Profile>
          <Avatar aria-hidden>SC</Avatar>
          <span>
            <strong>Security Crew</strong>
            <small>Operations</small>
          </span>
        </Profile>
      </Actions>
    </Bar>
  );
}

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Search = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.textSecondary};

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textPrimary};

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }

    &:focus {
      outline: none;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.accentSoft};
    color: ${({ theme }) => theme.colors.accentContrast};
  }
`;

const Profile = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  border: none;
  background: transparent;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: background 0.2s ease;

  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: ${({ theme }) => theme.colors.textSecondary};

    strong {
      font-size: 0.95rem;
      color: ${({ theme }) => theme.colors.textPrimary};
    }

    small {
      font-size: 0.75rem;
    }
  }

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

const Avatar = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accentContrast};
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
