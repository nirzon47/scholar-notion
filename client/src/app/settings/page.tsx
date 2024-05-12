import ThemeToggle from '@/components/settings/ThemeToggle'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const Settings = () => {
	return (
		<div className='flex min-h-[calc(100vh-3.5rem)] w-full flex-col'>
			<main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
				<div className='mx-auto grid w-full max-w-6xl gap-2'>
					<h1 className='text-3xl font-semibold'>Settings</h1>
				</div>
				<div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
					<nav
						className='grid gap-4 text-sm text-muted-foreground'
						x-chunk='dashboard-04-chunk-0'
					></nav>
					<div className='grid gap-6'>
						<Card>
							<CardHeader>
								<CardTitle>Website theme</CardTitle>
								<CardDescription>
									Change the theme of the website
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='flex items-center gap-4'>
									<ThemeToggle />
									<p>
										Choose between system preference, light or dark
										theme
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Settings
