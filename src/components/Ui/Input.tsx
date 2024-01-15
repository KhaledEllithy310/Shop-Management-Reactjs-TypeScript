import TextField, { TextFieldProps } from '@mui/material/TextField'

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  title: string
}

export default function Input ({ title, ...rest }: InputProps) {
  return (
    <div>
      <TextField label={title} variant='outlined' size='small' {...rest} />
    </div>
  )
}
