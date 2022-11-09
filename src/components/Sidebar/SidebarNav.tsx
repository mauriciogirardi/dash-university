import { Stack } from '@chakra-ui/react'
import {
  RiBook3Line,
  RiDashboardLine,
  RiUser2Line,
  RiUser3Line,
  RiUserReceived2Line,
} from 'react-icons/ri'
import { NavLink } from './NaviLink'
import { NavSection } from './NavSection'

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine} title="Dashboard" />
      </NavSection>

      <NavSection title="USUÁRIOS">
        <NavLink href="/students" icon={RiUser3Line} title="Alunos" />
        <NavLink href="/users" icon={RiUserReceived2Line} title="Usuários" />
        <NavLink href="/teachers" icon={RiUser2Line} title="Professores" />
      </NavSection>

      <NavSection title="CURSOS">
        <NavLink href="/courses" icon={RiBook3Line} title="Cursos" />
      </NavSection>
    </Stack>
  )
}
