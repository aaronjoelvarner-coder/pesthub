'use client';

import { useEffect, useState } from 'react';

type QueueItem = { id: string; payload: any; createdAt: number };

export default function TechJobDetail({ params }: { params: { id: string } }) {
  const [notes, setNotes] = useState('');
  const [pending, setPending] = useState(0);
  const [lastSync, setLastSync] = useState<string>('Never');

  useEffect(() => {
    setPending(JSON.parse(localStorage.getItem('offlineQueue') || '[]').length);
    setLastSync(localStorage.getItem('lastSync') || 'Never');
  }, []);

  async function enqueue(status: string) {
    const queue: QueueItem[] = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
    queue.push({ id: crypto.randomUUID(), createdAt: Date.now(), payload: { jobId: params.id, status, notes, checklistDone: true } });
    localStorage.setItem('offlineQueue', JSON.stringify(queue));
    setPending(queue.length);
  }

  async function syncNow() {
    const queue: QueueItem[] = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
    for (const item of queue) {
      await fetch(`/api/jobs/${params.id}/offline-sync`, { method: 'POST', body: JSON.stringify(item.payload) });
    }
    localStorage.setItem('offlineQueue', '[]');
    localStorage.setItem('lastSync', new Date().toLocaleString());
    setPending(0);
    setLastSync(localStorage.getItem('lastSync') || 'Never');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Tech Job Detail</h1>
      <div className="card space-y-2">
        <p>Pending Sync: <b>{pending}</b> · Last Sync: <b>{lastSync}</b></p>
        <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} className="w-full border rounded p-2" placeholder="Checklist/notes" />
        <div className="flex gap-2">
          <button className="btn" onClick={()=>enqueue('ON_SITE')}>Start On Site</button>
          <button className="btn" onClick={()=>enqueue('COMPLETED')}>Complete (queue offline)</button>
          <button className="btn" onClick={syncNow}>Sync queued updates</button>
        </div>
      </div>
    </div>
  );
}
