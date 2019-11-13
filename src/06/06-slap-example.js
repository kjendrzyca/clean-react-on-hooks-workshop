// # 💡 SLAP

// - 💡 Code within a given segment/block should be at the same level of abstraction.
// - 💡 Functions should do just one thing, and they should do it well. — Robert Martin

// ## Example

import React, {Component} from 'react'
import './App.css'
import {Message, Button, Form, Label, Segment, Grid} from 'semantic-ui-react'
import * as Yup from 'yup'
import {Formik} from 'formik'

const {Input, Field, Checkbox} = Form

const CATEGORIES = ['jedzenie', 'samochód', 'inne', 'firma', 'mieszkanie']

const {Row, Column} = Grid

const PROGRAMISTA_15K = 15000

const renderError = (touched, error) =>
  touched ? Boolean(error) && <Message color="red">{error}</Message> : null

const getKey = () => {
  const now = new Date()

  return `${now.getFullYear()}-${now.getMonth() + 1}` // js things
}

const renderMonth = () => {
  return new Date().toLocaleDateString('pl-PL', {month: 'long'})
}

const getUserData = () =>
  fetch(`/api/userData?when=${getKey()}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())

const persistExpense = expense =>
  fetch('/api/expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      when: getKey(),
      expense,
    }),
  }).then(res => res.json())

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {expenses: [], additionalIncome: 0, income: PROGRAMISTA_15K}
  }

  async componentDidMount() {
    const {additionalIncome, income, values} = await getUserData()

    this.setState({
      income,
      additionalIncome,
      expenses: values,
    })
  }

  renderBalance = () => {
    const {income, additionalIncome, expenses} = this.state
    const balance =
      income +
      additionalIncome -
      expenses.reduce((accu, expense) => accu + expense.howMuch, 0)

    return (
      <Label color="green" size="huge">
        {balance}
      </Label>
    )
  }

  renderForm = () => {
    return (
      <Formik
        initialValues={{expense: '', howMuch: 0, category: '', fixed: false}}
        onSubmit={async (values, {setSubmitting, resetForm}) => {
          setSubmitting(true)

          const {errors} = await persistExpense(values)

          if (errors && errors.length) {
            // TODO
            return
          }

          this.setState(
            oldState => ({
              expenses: [...oldState.expenses, values],
            }),
            () => {
              setSubmitting(false)
              resetForm()
            },
          )
        }}
        validationSchema={Yup.object().shape({
          category: Yup.string().required('kategoria jest potrzebna'),
          expense: Yup.string().required('wydatek jest ważny'),
          howMuch: Yup.number().min(0.01, 'nic nie kosztuje 0zł ;('),
        })}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              error={Boolean(touched.howMuch && errors.howMuch)}
              fluid
              id="howMuch"
              label="kwota"
              onChange={handleChange}
              placeholder="kwota"
              required
              step={0.01}
              type="number"
              value={values.howMuch}
            />
            {renderError(touched.howMuch, errors.howMuch)}
            <Input
              error={Boolean(touched.expense && errors.expense)}
              fluid
              id="expense"
              label="wydatek"
              onChange={handleChange}
              placeholder="wydatek"
              required
              value={values.expense}
            />
            {renderError(touched.expense, errors.expense)}
            <Input
              error={Boolean(touched.category && errors.category)}
              fluid
              id="category"
              label="kategoria"
              list="categories"
              onChange={handleChange}
              placeholder="kategoria"
              required
              value={values.category}
            />
            {renderError(touched.category, errors.category)}
            <datalist id="categories">
              {CATEGORIES.map(category => (
                <option key={category} value={category} />
              ))}
            </datalist>
            <Field>
              <Checkbox
                checked={values.fixed}
                label="powtarza się"
                onChange={(e, {checked}) => setFieldValue('fixed', checked)}
              />
            </Field>
            <Field>
              <Button
                disabled={isSubmitting}
                fluid
                positive
                size="huge"
                type="submit"
              >
                OK
              </Button>
            </Field>
          </Form>
        )}
      </Formik>
    )
  }

  render() {
    return (
      <main className="App">
        <Grid container>
          <Row textAlign="center">
            <Column>
              <Segment vertical>{this.renderBalance()}</Segment>
              <Segment vertical>{renderMonth()}</Segment>
            </Column>
          </Row>
          <Row>
            <Column>{this.renderForm()}</Column>
          </Row>
        </Grid>
      </main>
    )
  }
}

export default App
