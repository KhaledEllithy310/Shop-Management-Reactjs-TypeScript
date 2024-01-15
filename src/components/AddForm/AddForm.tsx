import { useForm, SubmitHandler } from 'react-hook-form'
import Input from '../Ui/Input'
import { formFields } from '../../Data'
import { IFormFields, IShop } from '../../interfaces'
import AppButton from '../Ui/Button'
import Box from '@mui/material/Box'

interface IProps {
  handleClose: () => void
  setShops: (val: IShop[]) => void
  shops: IShop[]
}
const AddForm = ({ handleClose, setShops, shops }: IProps) => {
  // Handlers
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormFields>()

  const onSubmit: SubmitHandler<IFormFields> = data => {
    setShops([...shops, { ...data }])
    handleClose()
  }

  //----------RENDERS----------//

  const renderInputForm = formFields.map(field => (
    <Input
      key={field.name}
      title={field.label}
      type={field.type}
      name={field.name}
      register={register}
      errors={errors}
    />
  ))

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <section className='form__inputs'>{renderInputForm}</section>{' '}
      {/* start actions */}
      <Box
        component={'section'}
        sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 3 }}
      >
        <AppButton
          onClick={handleClose}
          variant='outlined'
          title='Cancel'
          color='error'
          fullWidth
          sx={{ textTransform: 'capitalize' }}
        />
        <AppButton
          variant='contained'
          sx={{ textTransform: 'capitalize' }}
          title='Continue'
          fullWidth
          type='submit'
        />
      </Box>
      {/* end actions */}
    </form>
  )
}

export default AddForm
