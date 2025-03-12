import React, { useState } from 'react'
import { useField, FieldHookConfig } from 'formik'
import classNames from 'classnames'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  name: string
  standalone?: boolean
  icon?: React.ReactNode
}

export const Input = ({
  label, error, className, standalone = true, icon, ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const [field, meta] = standalone
    ? useField(props as FieldHookConfig<string>)
    : [{ field: props }, { error: error, touched: false }]

  const showError = standalone
    ? meta.error && meta.touched
    : error

  return <div className="w-full text-left">
    {label &&
      <label
        htmlFor={props.name}
        className="block text-sm font-medium mb-1 text-night-700 dark:text-day-200"
      >
        {label}
      </label>
    }

    <div className="relative">
      <input
        {...(standalone
          ? field
          : props
        )}
        className={classNames(
          'w-full px-4 py-3 min-w-none rounded-full bg-day-300 dark:bg-night-500',
          'text-night-900 dark:text-day-200 transition-all duration-300',
          'outline-none focus:ring-2 ring-dream-600',
          className, {
          'pl-12': icon,
          'pr-12': props.type === "password",
          'border-red-500 focus:border-red-500 focus:ring-red-500': showError
        })}
      />

      {icon &&
        <div className="absolute inset-y-0 left-4 flex items-center">
          {icon}
        </div>
      }

      {props.type === "password" &&
        <button
          className="absolute inset-y-0 right-4 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword
            ? <IconEyeOff />
            : <IconEye />
          }
        </button>
      }
    </div>
    {showError &&
      <p className="text-sm mt-1 text-red-500 dark:text-red-400">
        {standalone
          ? meta.error
          : error
        }
      </p>
    }
  </div>
}
