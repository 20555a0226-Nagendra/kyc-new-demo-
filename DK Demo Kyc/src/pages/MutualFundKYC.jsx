import { useState, useEffect } from 'react'
import MasterRecordReference from '../components/MasterRecordReference'

const STORAGE_KEY = 'kyc-mutual-fund-saved-records'

function loadSavedRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const FORM_KEYS = [
  'imageName', 'recordNo', 'kycNumber', 'name', 'guardianName', 'gender', 'maritalStatus', 'dob',
  'address', 'landmark', 'city', 'zip', 'cityOfBirth', 'nationality', 'photoAttachment', 'residentialStatus',
  'occupation', 'validDocuments', 'annualIncome', 'brokerName', 'subBrokerCode', 'bankSerialNo',
  'secondApplicantName', 'amountReceiveFrom', 'amount', 'arnNo', 'secondAddress', 'occupationProfession', 'remarks',
]

const INITIAL_FORM = Object.fromEntries(FORM_KEYS.map((k) => [k, '']))

const REFERENCE_COLUMNS = [
  { key: 'imageName', label: 'IMAGE NAME' },
  { key: 'recordNo', label: 'RECORD NO' },
  { key: 'kycNumber', label: 'KYC NUMBER' },
  { key: 'name', label: 'NAME' },
  { key: 'guardianName', label: 'GUARDIAN NAME' },
  { key: 'gender', label: 'GENDER' },
  { key: 'maritalStatus', label: 'MARITAL STATUS' },
  { key: 'dob', label: 'DOB' },
  { key: 'address', label: 'ADDRESS' },
  { key: 'landmark', label: 'LANDMARK' },
  { key: 'city', label: 'CITY' },
  { key: 'zip', label: 'ZIP' },
  { key: 'cityOfBirth', label: 'CITY OF BIRTH' },
  { key: 'nationality', label: 'NATIONALITY' },
  { key: 'photoAttachment', label: 'PHOTO' },
  { key: 'residentialStatus', label: 'RESIDENTIAL STATUS' },
  { key: 'occupation', label: 'OCCUPATION' },
  { key: 'validDocuments', label: 'VALID DOCUMENTS' },
  { key: 'annualIncome', label: 'ANNUAL INCOME' },
  { key: 'brokerName', label: 'BROKER NAME' },
  { key: 'subBrokerCode', label: 'SUB BROKER CODE' },
  { key: 'bankSerialNo', label: 'BANK SERIAL NO' },
  { key: 'secondApplicantName', label: '2ND APPLICANT' },
  { key: 'amountReceiveFrom', label: 'AMOUNT RECEIVE FROM' },
  { key: 'amount', label: 'AMOUNT' },
  { key: 'arnNo', label: 'ARN NO' },
  { key: 'secondAddress', label: '2ND ADDRESS' },
  { key: 'occupationProfession', label: 'OCCUPATION/PROFESSION' },
  { key: 'remarks', label: 'REMARKS' },
]

const firstNames = ['Ramesh', 'Lakshmi', 'Anita', 'Vikram', 'Meera', 'Sanjay', 'Priya', 'Arjun', 'Kavita', 'Deepa']
const lastNames = ['Sharma', 'Venkatesh', 'Desai', 'Patel', 'Nair', 'Kumar', 'Iyer', 'Singh', 'Krishnan', 'Reddy']
const genders = ['Male', 'Female', 'Other']
const marital = ['Single', 'Married', 'Divorced', 'Widowed']
const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad']
const nationalities = ['Indian', 'NRI', 'PIO']
const residential = ['Resident', 'NRI', 'PIO']
const occupations = ['Engineer', 'Doctor', 'Teacher', 'Business', 'Salaried', 'Self-employed']
const docs = ['PAN', 'Aadhaar', 'Passport', 'Voter ID']
const brokers = ['HDFC Securities', 'ICICI Direct', 'Axis MF', 'SBI MF', 'Kotak MF']

function generateRandomReference() {
  const f = firstNames[Math.floor(Math.random() * firstNames.length)]
  const l = lastNames[Math.floor(Math.random() * lastNames.length)]
  const f2 = firstNames[Math.floor(Math.random() * firstNames.length)]
  const l2 = lastNames[Math.floor(Math.random() * lastNames.length)]
  const city = cities[Math.floor(Math.random() * cities.length)]
  const d = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')
  const m = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
  const y = 1950 + Math.floor(Math.random() * 50)
  return {
    imageName: `IMG_${Math.floor(Math.random() * 90000) + 10000}.jpg`,
    recordNo: String(Math.floor(Math.random() * 900000) + 100000),
    kycNumber: `KYC#${Math.floor(Math.random() * 9000000) + 1000000}`,
    name: `${f} ${l}`,
    guardianName: `${f2} ${l2}`,
    gender: genders[Math.floor(Math.random() * genders.length)],
    maritalStatus: marital[Math.floor(Math.random() * marital.length)],
    dob: `${d}-${m}-${y}`,
    address: `${Math.floor(Math.random() * 999) + 1} ${city} Street, Block ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
    landmark: ['N.A', 'Near Temple', 'Opp. Bank', 'Main Square'][Math.floor(Math.random() * 4)],
    city,
    zip: String(Math.floor(Math.random() * 90000) + 10000),
    cityOfBirth: cities[Math.floor(Math.random() * cities.length)],
    nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
    photoAttachment: 'Attached',
    residentialStatus: residential[Math.floor(Math.random() * residential.length)],
    occupation: occupations[Math.floor(Math.random() * occupations.length)],
    validDocuments: docs.slice(0, 2 + Math.floor(Math.random() * 2)).join(', '),
    annualIncome: `${Math.floor(Math.random() * 50) + 5} Lakh`,
    brokerName: brokers[Math.floor(Math.random() * brokers.length)],
    subBrokerCode: `SB${Math.floor(Math.random() * 9000) + 1000}`,
    bankSerialNo: String(Math.floor(Math.random() * 900000) + 100000),
    secondApplicantName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    amountReceiveFrom: ['Bank Transfer', 'Cheque', 'UPI', 'DD'][Math.floor(Math.random() * 4)],
    amount: `₹${(Math.random() * 500000 + 10000).toFixed(0)}`,
    arnNo: `ARN${Math.floor(Math.random() * 900000) + 100000}`,
    secondAddress: `${Math.floor(Math.random() * 99) + 1} Park Ave`,
    occupationProfession: occupations[Math.floor(Math.random() * occupations.length)],
    remarks: ['Nil', 'Verified', 'Pending'][Math.floor(Math.random() * 3)],
  }
}

function FormRow({ label, name, value, onChange, placeholder = 'Enter value' }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs font-medium text-white">{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  )
}

function normalize(s) {
  return String(s ?? '').trim()
}

export default function MutualFundKYC() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [referenceRecord, setReferenceRecord] = useState(() => generateRandomReference())
  const [savedRecords, setSavedRecords] = useState(loadSavedRecords)
  const [validationError, setValidationError] = useState(null)
  const [editingRecordId, setEditingRecordId] = useState(null)
  const [viewingRecord, setViewingRecord] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRecords))
  }, [savedRecords])

  const updateForm = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setValidationError(null)
  }

  const handleSave = () => {
    if (editingRecordId) {
      setSavedRecords((prev) =>
        prev.map((r) => (r.id === editingRecordId ? { ...form, id: r.id } : r))
      )
      setEditingRecordId(null)
      setForm(INITIAL_FORM)
      setValidationError(null)
      return
    }
    const mismatches = []
    const keysToValidate = FORM_KEYS.filter((k) => k !== 'imageName')
    for (const key of keysToValidate) {
      const a = normalize(form[key])
      const b = normalize(referenceRecord[key])
      if (a !== b) mismatches.push(REFERENCE_COLUMNS.find((c) => c.key === key)?.label || key)
    }
    if (mismatches.length > 0) {
      setValidationError({
        message: 'Data does not match the Master Record Reference. Please correct the following fields:',
        fields: mismatches,
      })
      return
    }
    setValidationError(null)
    setSavedRecords((prev) => [...prev, { ...form, id: Date.now() }])
    setReferenceRecord(generateRandomReference())
    setForm(INITIAL_FORM)
  }

  const handleEditRecord = (record) => {
    setForm(FORM_KEYS.reduce((acc, k) => ({ ...acc, [k]: record[k] ?? '' }), {}))
    setEditingRecordId(record.id)
    setValidationError(null)
  }

  const handleDeleteRecord = (id) => {
    setSavedRecords((prev) => prev.filter((r) => r.id !== id))
    if (editingRecordId === id) {
      setForm(INITIAL_FORM)
      setEditingRecordId(null)
    }
  }

  const handleDeleteAll = () => {
    setSavedRecords([])
    setEditingRecordId(null)
    setForm(INITIAL_FORM)
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex gap-4 min-h-[420px]">
        <div className="w-1/2 min-w-0 flex flex-col bg-blue-700 rounded-xl overflow-hidden shrink-0">
          <div className="bg-blue-900 px-4 py-3 shrink-0 flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Data Entry Console</h2>
          </div>
          <div className="flex-1 overflow-auto p-4 min-h-0">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {FORM_KEYS.map((key) => (
                <FormRow
                  key={key}
                  label={REFERENCE_COLUMNS.find((c) => c.key === key)?.label?.replace(/_/g, ' ') || key}
                  name={key}
                  value={form[key]}
                  onChange={updateForm}
                  placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2 min-w-0 flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="flex-1 overflow-auto min-h-0">
            <MasterRecordReference
              columns={REFERENCE_COLUMNS}
              rows={referenceRecord ? [referenceRecord] : []}
              layout="grid"
              gridCols={2}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
          Save
        </button>
        {editingRecordId && (
          <span className="text-sm text-amber-600 font-medium ml-2">Editing record — Save to update</span>
        )}
      </div>

      {validationError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setValidationError(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-200 shrink-0">
              <h3 className="text-lg font-semibold text-red-800">Validation Error</h3>
            </div>
            <div className="px-6 py-4 overflow-y-auto min-h-0 flex-1">
              <p className="text-slate-700 mb-3">{validationError.message}</p>
              <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                {validationError.fields.map((field) => (
                  <li key={field}>{field}</li>
                ))}
              </ul>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end shrink-0 bg-white">
              <button type="button" onClick={() => setValidationError(null)} className="px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {savedRecords.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-blue-600 shrink-0" />
              <h2 className="text-base font-semibold text-slate-800">Saved Records (Output Cards)</h2>
              <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                {savedRecords.length} card{savedRecords.length !== 1 ? 's' : ''} saved
              </span>
            </div>
            <button
              type="button"
              onClick={handleDeleteAll}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 shrink-0"
            >
              Delete all
            </button>
          </div>
          <p className="px-6 pt-2 text-xs text-slate-500">
            Stored in this browser (localStorage). Limit is about 5–10 MB per site — thousands of cards are usually fine.
          </p>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedRecords.map((record) => (
              <div key={record.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50">
                <div className="text-sm text-slate-700 space-y-1 mb-4">
                  <p><span className="font-medium text-slate-500">Record No:</span> {record.recordNo || '—'}</p>
                  <p><span className="font-medium text-slate-500">KYC No:</span> {record.kycNumber || '—'}</p>
                  <p><span className="font-medium text-slate-500">Name:</span> {record.name || '—'}</p>
                  <p><span className="font-medium text-slate-500">Broker:</span> {record.brokerName || '—'}</p>
                  <p><span className="font-medium text-slate-500">Amount:</span> {record.amount || '—'}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => handleEditRecord(record)} className="flex-1 min-w-[80px] py-2 px-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">Edit data</button>
                  <button type="button" onClick={() => setViewingRecord(record)} className="flex-1 min-w-[80px] py-2 px-3 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700">View</button>
                  <button type="button" onClick={() => handleDeleteRecord(record.id)} className="py-2 px-3 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {viewingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setViewingRecord(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">View Record</h3>
              <button type="button" onClick={() => setViewingRecord(null)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="overflow-auto p-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {REFERENCE_COLUMNS.map((col) => (
                <div key={col.key} className="flex flex-col gap-0.5">
                  <span className="font-medium text-slate-500 text-xs">{col.label}</span>
                  <span className="text-slate-800">{viewingRecord[col.key] || '—'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
