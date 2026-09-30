import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#0d0d0d] group-[.toaster]:text-zinc-200 group-[.toaster]:border-white/[0.08] group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl group-[.toaster]:px-4 group-[.toaster]:py-3.5",
          description: "group-[.toast]:text-zinc-500 group-[.toast]:text-xs",
          actionButton:
            "group-[.toast]:bg-white group-[.toast]:text-black group-[.toast]:rounded-md group-[.toast]:text-xs group-[.toast]:font-medium",
          cancelButton:
            "group-[.toast]:bg-zinc-800 group-[.toast]:text-zinc-400 group-[.toast]:rounded-md group-[.toast]:text-xs",
          success:
            "group-[.toaster]:border-emerald-500/30 group-[.toaster]:bg-emerald-500/[0.05]",
          error:
            "group-[.toaster]:border-red-500/30 group-[.toaster]:bg-red-500/[0.05]",
          loading:
            "group-[.toaster]:border-white/10 group-[.toaster]:bg-white/[0.02]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
