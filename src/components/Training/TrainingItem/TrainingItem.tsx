import type { TrainingRecord } from '@/types/training'
import './TrainingItem.css'

interface TrainingItemProps {
  record: TrainingRecord
  onDelete: (date: string) => void
  onEdit: (record: TrainingRecord) => void
}

export default function TrainingItem({
  record,
  onDelete,
  onEdit,
}: TrainingItemProps) {
  return (
    <div className="training-item">
      <span>
        {record.date}
      </span>
      <span>
        {record.distance}
      </span>
      <span className="training-item__actions">
        <button
          onClick={() => onEdit(record)}
          type="button"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(record.date)}
          type="button"
        >
          ✘
        </button>
      </span>
    </div>
  )
}
