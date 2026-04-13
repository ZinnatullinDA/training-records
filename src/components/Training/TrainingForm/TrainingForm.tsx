import type { FormEvent } from 'react'
import type { TrainingRecord } from '@/types/training'
import { useState } from 'react'
import './TrainingForm.css'

interface TrainingFormProps {
  onSubmit: (date: string, distance: number) => void
  editingRecord: TrainingRecord | null
  onCancelEdit: () => void
}

export default function TrainingForm({
  onSubmit,
  editingRecord,
  onCancelEdit,
}: TrainingFormProps) {
  const [date, setDate] = useState(() => editingRecord?.date ?? '')
  const [distance, setDistance] = useState(() => editingRecord ? String(editingRecord.distance) : '')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedDate = date.trim()
    const parsedDistance = Number(distance)

    if (!trimmedDate || Number.isNaN(parsedDistance) || parsedDistance <= 0) {
      return
    }

    onSubmit(trimmedDate, parsedDistance)
    setDate('')
    setDistance('')
  }

  return (
    <form
      className="training-form"
      onSubmit={handleSubmit}
    >
      <div className="training-form__field">
        <label htmlFor="date">
          Дата (ДД.ММ.ГГ)
        </label>
        <input
          id="date"
          onChange={e => setDate(e.target.value)}
          placeholder="20.07.2019"
          type="text"
          value={date}
        />
      </div>

      <div className="training-form__field">
        <label htmlFor="distance">
          Пройдено км
        </label>
        <input
          id="distance"
          onChange={e => setDistance(e.target.value)}
          placeholder="5.7"
          step="0.1"
          type="number"
          value={distance}
        />
      </div>

      <button
        className="training-form__button"
        type="submit"
      >
        OK
      </button>

      {editingRecord && (
        <button
          className="training-form__button training-form__button_cancel"
          onClick={() => {
            setDate('')
            setDistance('')
            onCancelEdit()
          }}
          type="button"
        >
          Отмена
        </button>
      )}
    </form>
  )
}
