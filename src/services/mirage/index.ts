import {
  createServer,
  Model,
  Factory,
  Response,
  ActiveModelSerializer,
} from 'miragejs'
import { faker } from '@faker-js/faker'

import { Course } from '../../types/Course'
import { Student } from '../../types/Student'
import { Teachers } from '../../types/Teacher'
import { User } from '../../types/User'

interface Pages {
  page: number
  per_page: number
}

//@ts-ignore
function compareDate(a, b) {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
      student: Model.extend<Partial<Student>>({}),
      teacher: Model.extend<Partial<Teachers>>({}),
      course: Model.extend<Partial<Course>>({}),
    },

    factories: {
      user: Factory.extend<Partial<User>>({
        email() {
          return faker.internet.email().toLowerCase()
        },
        name() {
          return faker.name.fullName()
        },
        created_at() {
          return faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-11-15T00:00:00.000Z')
            .toISOString()
        },
        level() {
          return 'admin'
        },
        status() {
          return 'ativo'
        },
        password() {
          return '123456'
        },
      }),

      teacher: Factory.extend<Partial<Teachers>>({
        created_at() {
          return faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-11-15T00:00:00.000Z')
            .toISOString()
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        name() {
          return faker.name.fullName()
        },
        birth() {
          return faker.date.birthdate({ mode: 'age' }).toISOString()
        },
        city() {
          return faker.address.cityName()
        },
        neighborhood() {
          return faker.address.city()
        },
        address() {
          return faker.address.streetAddress()
        },
        phone() {
          return faker.phone.number('47#########')
        },
        postal_code() {
          return faker.address.zipCode('########')
        },
        salary() {
          return '250063'
        },
        academic_level() {
          return 'Doutorado'
        },
        area_teaching(i) {
          return `Banco de dados ${i}`
        },
        cpf() {
          return faker.finance.account(9)
        },
        hiring_date() {
          return faker.date.past(10, '2015-01-01T00:00:00.000Z').toISOString()
        },
        due_date() {
          return faker.date.future(10, '2015-01-01T00:00:00.000Z').toISOString()
        },
        registration_number() {
          return faker.random.alphaNumeric(5, { bannedChars: ['A'] })
        },
        type_license() {
          return 'A-B'
        },
      }),

      student: Factory.extend<Partial<Student>>({
        created_at() {
          return faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-11-15T00:00:00.000Z')
            .toISOString()
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        name() {
          return faker.name.fullName()
        },
        birth() {
          return faker.date.birthdate({ mode: 'age' }).toISOString()
        },
        city() {
          return faker.address.cityName()
        },
        neighborhood() {
          return faker.address.city()
        },
        address() {
          return faker.address.streetAddress()
        },
        phone() {
          return faker.phone.number('47#########')
        },
        postal_code() {
          return faker.address.zipCode('########')
        },
        cpf() {
          return faker.finance.account(9)
        },
        due_date() {
          return faker.date.future(10, '2015-01-01T00:00:00.000Z').toISOString()
        },
        registration_number() {
          return faker.random.alphaNumeric(5, { bannedChars: ['A'] })
        },
        course(n) {
          return `Engenharia ${n}`
        },
        period() {
          return 'Manha'
        },
        semester() {
          return '1'
        },
        status() {
          return 'cursando'
        },
      }),

      course: Factory.extend<Partial<Course>>({
        created_at() {
          return faker.date
            .between('2020-01-01T00:00:00.000Z', '2022-11-15T00:00:00.000Z')
            .toISOString()
        },
        name() {
          return faker.name.fullName()
        },
        description() {
          return faker.lorem.lines(3)
        },
        status() {
          return 'ativo'
        },
        id_teacher(n) {
          return String(n)
        },
        teacher(n) {
          return `Professor ${n}`
        },
        semester() {
          return '5'
        },
      }),
    },

    seeds(server) {
      server.createList('user', 26)
      server.createList('student', 26)
      server.createList('teacher', 28)
      server.createList('course', 5)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750

      // USERS
      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams as Pages

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)

        const users = this.serialize(schema.all('user'))
          .users.sort(compareDate)
          .slice(pageStart, pageEnd)

        return new Response(200, { 'x-total-count': String(total) }, { users })
      })

      this.put('/users/:id', function (schema, request) {
        const { id } = request.params
        const attrs = this.normalizedRequestAttrs()
        return schema.find('user', id)?.update(attrs) || schema
      })

      this.get('/users/:id')
      this.delete('/users/:id')
      this.post('/users')

      // STUDENTS
      this.get('/students', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams as Pages

        const total = schema.all('student').length

        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)

        const students = this.serialize(schema.all('student'))
          .students.sort(compareDate)
          .slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { students }
        )
      })

      this.put('/students/:id', function (schema, request) {
        const { id } = request.params
        const attrs = this.normalizedRequestAttrs()
        return schema.find('student', id)?.update(attrs) || schema
      })

      this.get('/students/:id')
      this.delete('/students/:id')
      this.post('/students')

      // TEACHERS
      this.get('/teachers', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams as Pages

        const total = schema.all('teacher').length

        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)

        const teachers = this.serialize(schema.all('teacher'))
          .teachers.sort(compareDate)
          .slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { teachers }
        )
      })

      this.get('/teachers-options', function (schema, request) {
        const teachers = schema.all('teacher').models.map((t) => ({
          value: t.id,
          name: t.name,
        }))

        return teachers
      })

      this.put('/teachers/:id', function (schema, request) {
        const { id } = request.params
        const attrs = this.normalizedRequestAttrs()
        return schema.find('teacher', id)?.update(attrs) || schema
      })

      this.get('/teachers/:id')
      this.delete('/teachers/:id')
      this.post('/teachers')

      // COURSES
      this.get('/courses', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams as Pages

        const total = schema.all('course').length

        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)

        const courses = this.serialize(schema.all('course'))
          .courses.sort(compareDate)
          .slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { courses }
        )
      })

      this.put('/courses/:id', function (schema, request) {
        const { id } = request.params
        const attrs = this.normalizedRequestAttrs()
        return schema.find('course', id)?.update(attrs) || schema
      })

      this.get('/courses/:id')
      this.delete('/courses/:id')
      this.post('/courses')

      this.namespace = ''
      this.passthrough()
    },
  })

  return server
}
