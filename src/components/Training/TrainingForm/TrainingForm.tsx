import type { FormEvent } from 'react'
import type { TrainingRecord } from '@/types/training'
import { useState } from 'react'
import './TrainingForm.css'

function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  const day = digits.slice(0, 2)
  const month = digits.slice(2, 4)
  const year = digits.slice(4, 8)

  return [day, month, year].filter(Boolean).join('.')
}

function isValidDate(value: string): boolean {
  const [day, month, year] = value.split('.').map(Number)

  if ([day, month, year].some(Number.isNaN)) {
    return false
  }

  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year
    || date.getMonth() !== month - 1
    || date.getDate() !== day
  ) {
    return false
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)

  return date.getTime() >= today.getTime()
}

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
  const [dateError, setDateError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedDate = date.trim()
    const parsedDistance = Number(distance)

    if (!trimmedDate || Number.isNaN(parsedDistance) || parsedDistance <= 0) {
      return
    }

    if (!isValidDate(trimmedDate)) {
      setDateError('Дата должна быть не раньше сегодняшнего дня и в формате ДД.ММ.ГГГГ')
      return
    }

    setDateError('')
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
          Дата (ДД.ММ.ГГГГ)
        </label>
        <input
          id="date"
          inputMode="numeric"
          maxLength={10}
          onChange={(e) => {
            setDate(formatDateInput(e.target.value))
            if (dateError) {
              setDateError('')
            }
          }}
          placeholder="20.07.2019"
          type="text"
          value={date}
        />
        {dateError && (
          <span className="training-form__error">
            {dateError}
          </span>
        )}
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
            setDateError('')
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
