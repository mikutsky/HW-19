import Vue from 'vue'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import 'element-ui/packages/theme-chalk/lib/index.css'
import {
  Button,
  Card,
  Alert,
  Form,
  Input,
  FormItem,
  Select,
  Option
} from 'element-ui'

const elements = [Button, Card, Alert, Form, Input, FormItem, Select, Option]

locale.use(lang)

elements.forEach(El => Vue.use(El, { locale }))
