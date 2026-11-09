import React from 'react'
import SearchBar from "../components/SearchBar"
import DashboardHeader from '../components/DashboardHeader'

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader
        name="Rahul"
        title="Dashboard"
        subtitle="Track your payments and balances at a glance."
        actions={
          <button className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white">
            New Payment
          </button>
        }
      />
      <SearchBar />
    </div>
  )
}

export default Dashboard
