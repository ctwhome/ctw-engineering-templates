export default function ({ store, redirect }) {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user?.uid) {
    return redirect('/login')
  }
}
