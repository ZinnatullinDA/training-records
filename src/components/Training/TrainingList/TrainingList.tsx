import type { TrainingRecord } from '@/types/training'
import TrainingItem from '../TrainingItem/TrainingItem'
import './TrainingList.css'

interface TrainingListProps {
  records: TrainingRecord[]
  onDelete: (date: string) => void
  onEdit: (record: TrainingRecord) => void
}

export default function TrainingList({
  records,
  onDelete,
  onEdit,
}: TrainingListProps) {
  return (
    <div className="training-list">
      <div className="training-list__header">
        <span>
          Дата (ДД.ММ.ГГ)
        </span>
        <span>
          Пройдено км
        </span>
        <span>
          Действия
        </span>
      </div>

      <div className="training-list__body">
        {records.map(record => (
          <TrainingItem
            key={record.date}
            onDelete={onDelete}
            onEdit={onEdit}
            record={record}
          />
        ))}
      </div>
    </div>
  )
}
