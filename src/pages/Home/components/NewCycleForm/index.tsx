import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisar ser de no minimo 5 minutos')
    .max(60, 'O ciclo precisar ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>




export function NewCycleForm () {

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  return (
      <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput
          id="task"
          placeholder="Dê um nome para o seu projeto"
          list="task-suggestions"
          {...register('task')}
          disabled={!!activeCycle}
        ></TaskInput>

        <datalist id="task-suggestions">
          <option value="Projeto 1"></option>
          <option value="Projeto 2"></option>
          <option value="Projeto 3"></option>
          <option value="Banana"></option>
        </datalist>

        <label htmlFor="minutesAmount">Durante</label>
        <MinutesAmountInput
          type="number"
          id="minutesAmount"
          placeholder="00"
          min={1}
          max={60}
          step={1}
          defaultValue={5}
          disabled={!!activeCycle}
          {...register('minutesAmount', { valueAsNumber: true })}
        ></MinutesAmountInput>

        <span>minutos.</span>
      </FormContainer>
  )
}