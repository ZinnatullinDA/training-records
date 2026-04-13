import type { TrainingRecord } from '@/types/training'
import { useState } from 'react'
import TrainingForm from '@/components/Training/TrainingForm/TrainingForm'
import TrainingList from '@/components/Training/TrainingList/TrainingList'
import './TrainingPage.css'

function parseDate(date: string): number {
  const [day, month, year] = date.split('.').map(Number)
  return new Date(year, month - 1, day).getTime()
}

function sortByDateDesc(records: TrainingRecord[]): TrainingRecord[] {
  return [...records].sort((a, b) => parseDate(b.date) - parseDate(a.date))
}

function addOrUpdateRecord(
  records: TrainingRecord[],
  newRecord: TrainingRecord,
): TrainingRecord[] {
  const existingIndex = records.findIndex(item => item.date === newRecord.date)

  if (existingIndex !== -1) {
    const updated = [...records]
    updated[existingIndex] = {
      ...updated[existingIndex],
      distance: updated[existingIndex].distance + newRecord.distance,
    }
    return sortByDateDesc(updated)
  }

  return sortByDateDesc([...records, newRecord])
}

function removeRecordByDate(records: TrainingRecord[], date: string): TrainingRecord[] {
  return records.filter(item => item.date !== date)
}

export default function TrainingPage() {
  const [records, setRecords] = useState<TrainingRecord[]>([])
  const [editingRecord, setEditingRecord] = useState<TrainingRecord | null>(null)

  const handleSubmit = (date: string, distance: number) => {
    const newRecord = { date, distance }

    setRecords((prev) => {
      if (!editingRecord) {
        return addOrUpdateRecord(prev, newRecord)
      }

      const recordsWithoutOld = removeRecordByDate(prev, editingRecord.date)
      return addOrUpdateRecord(recordsWithoutOld, newRecord)
    })

    setEditingRecord(null)
  }

  const handleDelete = (date: string) => {
    setRecords(prev => prev.filter(item => item.date !== date))

    if (editingRecord?.date === date) {
      setEditingRecord(null)
    }
  }

  const handleEdit = (record: TrainingRecord) => {
    setEditingRecord(record)
  }

  const handleCancelEdit = () => {
    setEditingRecord(null)
  }

  return (
    <div className="training-page">
      <TrainingForm
        editingRecord={editingRecord}
        key={editingRecord?.date ?? 'new-record'}
        onCancelEdit={handleCancelEdit}
        onSubmit={handleSubmit}
      />
      <TrainingList
        onDelete={handleDelete}
        onEdit={handleEdit}
        records={records}
      />
    </div>
  )
}
