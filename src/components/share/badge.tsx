import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react'
import { Badge } from '../ui/badge'

interface StatusBadgeProps {
  status: boolean
  trueText: string
  falseText: string
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  trueText,
  falseText,
  className,
}) => {
  return (
    <Badge
      variant="outline"
      className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-sm font-medium ${className ?? ''}`}
    >
      {status ? (
        <IconCircleCheckFilled className="w-4 h-4 fill-green-500 dark:fill-green-300" />
      ) : (
        <IconCircleXFilled className="w-4 h-4 fill-red-500 dark:fill-red-300" />
      )}
      <span title={status ? trueText : falseText}>
        {status ? trueText : falseText}
      </span>
    </Badge>
  )
}