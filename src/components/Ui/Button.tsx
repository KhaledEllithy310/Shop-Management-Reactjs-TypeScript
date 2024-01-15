import Button, { ButtonProps } from '@mui/material/Button'

interface IProps extends ButtonProps {
  title: string
}
export default function AppButton ({ title, ...rest }: IProps) {
  return <Button {...rest}>{title}</Button>
}
