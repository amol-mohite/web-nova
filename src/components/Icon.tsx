import {
  Building2,
  ShoppingCart,
  Rocket,
  Smartphone,
  Code2,
  Zap,
  Tag,
  Sparkles,
  MessageCircle,
  ClipboardList,
  Code,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
  Check,
  X,
  Menu,
  Instagram,
  Linkedin,
  Facebook,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Building2,
  ShoppingCart,
  Rocket,
  Smartphone,
  Code2,
  Zap,
  Tag,
  Sparkles,
  MessageCircle,
  ClipboardList,
  Code,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
  Check,
  X,
  Menu,
  Instagram,
  Linkedin,
  Facebook,
};

interface IconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className = 'w-5 h-5', strokeWidth = 2 }: IconProps) {
  const Cmp = iconMap[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}
