import { useState, useEffect } from 'react'
import MasterRecordReference from '../components/MasterRecordReference'

const STORAGE_KEY = 'kyc-mortgage-saved-records'

function loadSavedRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const TABS = [
  { id: 'personal', label: 'PERSONAL INFORMATION' },
  { id: 'asset', label: 'ASSET INFORMATION' },
  { id: 'official', label: 'OFFICIAL INFORMATION' },
]

const PERSONAL_KEYS = [
  'imageNo', 'recordNo', 'todaysDate', 'leadId', 'applicantFirstName', 'applicantLastName',
  'streetAddress', 'city', 'zipCode', 'applicantDob', 'coApplicantFirstName', 'coApplicantLastName',
  'bestTimeToCall', 'remark1',
]

const ASSET_KEYS = [
  'typeOfProperty', 'propertyValue', 'purposeOfLoan', 'mortgageType', 'loanAmount', 'loanTerm',
  'interestType', 'monthlyInstallment', 'existingLoan', 'annualIncome', 'downPayment', 'remark2',
]

const OFFICIAL_KEYS = [
  'lenderName', 'loanOfficerFirstName', 'loanOfficerLastName', 'trNumber', 'niNumber', 'occupation',
  'otherIncome', 'creditCardIssuer', 'creditCardType', 'creditScore', 'remark3',
]

const FORM_KEYS = [...PERSONAL_KEYS, ...ASSET_KEYS, ...OFFICIAL_KEYS]
const INITIAL_FORM = Object.fromEntries(FORM_KEYS.map((k) => [k, '']))

const REFERENCE_COLUMNS = [
  { key: 'imageNo', label: 'IMAGE NO' },
  { key: 'recordNo', label: 'RECORD NO' },
  { key: 'todaysDate', label: "TODAY'S DATE" },
  { key: 'leadId', label: 'LEAD ID' },
  { key: 'applicantFirstName', label: 'APPLICANT FIRST NAME' },
  { key: 'applicantLastName', label: 'APPLICANT LAST NAME' },
  { key: 'streetAddress', label: 'STREET ADDRESS' },
  { key: 'city', label: 'CITY' },
  { key: 'zipCode', label: 'ZIP CODE' },
  { key: 'applicantDob', label: 'APPLICANT DOB' },
  { key: 'coApplicantFirstName', label: 'CO-APPLICANT FIRST NAME' },
  { key: 'coApplicantLastName', label: 'CO-APPLICANT LAST NAME' },
  { key: 'bestTimeToCall', label: 'BEST TIME TO CALL' },
  { key: 'remark1', label: 'REMARK 1' },
  { key: 'typeOfProperty', label: 'TYPE OF PROPERTY' },
  { key: 'propertyValue', label: 'PROPERTY VALUE' },
  { key: 'purposeOfLoan', label: 'PURPOSE OF LOAN' },
  { key: 'mortgageType', label: 'MORTGAGE TYPE' },
  { key: 'loanAmount', label: 'LOAN AMOUNT' },
  { key: 'loanTerm', label: 'LOAN TERM' },
  { key: 'interestType', label: 'INTEREST TYPE' },
  { key: 'monthlyInstallment', label: 'MONTHLY INSTALLMENT' },
  { key: 'existingLoan', label: 'EXISTING LOAN' },
  { key: 'annualIncome', label: 'ANNUAL INCOME' },
  { key: 'downPayment', label: 'DOWN PAYMENT' },
  { key: 'remark2', label: 'REMARK 2' },
  { key: 'lenderName', label: 'LENDER NAME' },
  { key: 'loanOfficerFirstName', label: 'LOAN OFFICER FIRST NAME' },
  { key: 'loanOfficerLastName', label: 'LOAN OFFICER LAST NAME' },
  { key: 'trNumber', label: 'T. R. #' },
  { key: 'niNumber', label: 'N. I. #' },
  { key: 'occupation', label: 'OCCUPATION' },
  { key: 'otherIncome', label: 'OTHER INCOME' },
  { key: 'creditCardIssuer', label: 'CREDIT CARD ISSUER' },
  { key: 'creditCardType', label: 'CREDIT CARD TYPE' },
  { key: 'creditScore', label: 'CREDIT SCORE' },
  { key: 'remark3', label: 'REMARK 3' },
]

const firstNames = ['Allishbournt', 'Corine', 'Madelyne', 'Heinxerling', 'Hirschberg', 'Jean', 'Sanjay', 'Deepa', 'Priya']
const lastNames = ['Edwards', 'Launer', 'Mcclintoch', 'Kliver', 'Patel', 'Nair', 'Kumar', 'Sharma']
const cities = ['Mumbai', 'Delhi', 'Norwood Park', 'Washington', 'Chennai', 'Bangalore']
const propertyTypes = ['Single Family', 'Multi-unit', 'Attached', 'Movable dwelling']
const purposes = ['Purchase', 'Refinance', 'Debt consolidation', 'Home improvement']
const mortgageTypes = ['Fixed', 'Adjustable', 'Secured', 'FHLB Advances']

function generateRandomReference() {
  const d = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')
  const m = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
  const y = 2020 + Math.floor(Math.random() * 4)
  const today = `${m}-${d}-${y}`
  const dob = `${d}-${m}-${1950 + Math.floor(Math.random() * 50)}`
  return {
    imageNo: `FORM DFTRCD_${Math.floor(Math.random() * 90) + 10}_enc.jpg`,
    recordNo: String(Math.floor(Math.random() * 900000) + 100000),
    todaysDate: today,
    leadId: `LiD/ClIr._31#81_W-${Math.floor(Math.random() * 900000) + 100000}`,
    applicantFirstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    applicantLastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    streetAddress: `${Math.floor(Math.random() * 99999) + 1000} ${cities[Math.floor(Math.random() * cities.length)]} St`,
    city: cities[Math.floor(Math.random() * cities.length)],
    zipCode: String(Math.floor(Math.random() * 90000) + 10000),
    applicantDob: dob,
    coApplicantFirstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    coApplicantLastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    bestTimeToCall: ['Morning', 'Afternoon', 'Evening'][Math.floor(Math.random() * 3)],
    remark1: ['Good', 'N.A', 'Pending'][Math.floor(Math.random() * 3)],
    typeOfProperty: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
    propertyValue: String(Math.floor(Math.random() * 5000000) + 500000),
    purposeOfLoan: purposes[Math.floor(Math.random() * purposes.length)],
    mortgageType: mortgageTypes[Math.floor(Math.random() * mortgageTypes.length)],
    loanAmount: String(Math.floor(Math.random() * 5000000) + 500000),
    loanTerm: String(Math.floor(Math.random() * 20) + 10),
    interestType: ['Fixed', 'Variable'][Math.floor(Math.random() * 2)],
    monthlyInstallment: String((Math.random() * 50000 + 5000).toFixed(2)),
    existingLoan: ['Yes', 'No'][Math.floor(Math.random() * 2)],
    annualIncome: String(Math.floor(Math.random() * 50) + 5),
    downPayment: String(Math.floor(Math.random() * 1000000) + 100000),
    remark2: ['Nil', 'Verified'][Math.floor(Math.random() * 2)],
    lenderName: ['HAMPHIRE HOUSING FIN', 'CALIFORNIA HOUSING FINANCE', 'DAVIS-PENM MORTGAGE CO', 'TEVERNIER CAPITAL'][Math.floor(Math.random() * 4)],
    loanOfficerFirstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    loanOfficerLastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    trNumber: `#${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    niNumber: String(Math.floor(Math.random() * 900000000) + 100000000),
    occupation: ['Tax Specialist', 'Engineer', 'Technician', 'Consultant'][Math.floor(Math.random() * 4)],
    otherIncome: String(Math.floor(Math.random() * 20) + 1),
    creditCardIssuer: ['Capital One', 'USAA', 'Chase'][Math.floor(Math.random() * 3)],
    creditCardType: ['Visa', 'Mastercard', 'Amex'][Math.floor(Math.random() * 3)],
    creditScore: String(Math.floor(Math.random() * 200) + 600),
    remark3: ['Good', 'Yes', 'N.A'][Math.floor(Math.random() * 3)],
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

export default function MortgageDataEntry() {
  const [activeTab, setActiveTab] = useState(0)
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
    const keysToValidate = FORM_KEYS.filter((k) => k !== 'imageNo')
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

  const getTabKeys = () => {
    if (activeTab === 0) return PERSONAL_KEYS
    if (activeTab === 1) return ASSET_KEYS
    return OFFICIAL_KEYS
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex gap-4 h-[680px]">
        <div className="w-1/2 min-w-0 flex flex-col bg-blue-700 rounded-xl overflow-hidden shrink-0">
          <div className="bg-blue-900 px-4 py-3 shrink-0">
            <div className="flex gap-0">
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === i ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-600/50'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 min-h-0">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              {getTabKeys().map((key) => (
                <FormRow
                  key={key}
                  label={REFERENCE_COLUMNS.find((c) => c.key === key)?.label || key}
                  name={key}
                  value={form[key]}
                  onChange={updateForm}
                  placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}`}
                />
              ))}
            </div>
          </div>
          <div className="px-4 py-3 border-t border-blue-600 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setActiveTab((p) => Math.max(0, p - 1))}
              disabled={activeTab === 0}
              className="px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            {activeTab < TABS.length - 1 ? (
              <button
                type="button"
                onClick={() => setActiveTab((p) => p + 1)}
                className="px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            )}
          </div>
        </div>
        <div className="w-1/2 min-w-0 flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto">
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
            <button type="button" onClick={handleDeleteAll} className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 shrink-0">
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
                  <p><span className="font-medium text-slate-500">Applicant:</span> {[record.applicantFirstName, record.applicantLastName].filter(Boolean).join(' ') || '—'}</p>
                  <p><span className="font-medium text-slate-500">Lead ID:</span> {record.leadId || '—'}</p>
                  <p><span className="font-medium text-slate-500">Loan Amount:</span> {record.loanAmount || '—'}</p>
                  <p><span className="font-medium text-slate-500">Lender:</span> {record.lenderName || '—'}</p>
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
