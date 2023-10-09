import pygame
import sys
import math
import random

# Constants
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 800
BACKGROUND_COLOR = (255, 255, 255)
VORTEX_COLOR = (0, 0, 255)
SMALL_VORTEX_RADIUS = 5
LARGE_VORTEX_RADIUS = 100
NUM_SMALL_VORTICES = 50

# Initialize Pygame
pygame.init()
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Vortex Simulation")

# Define the class for vortices
class Vortex:
    def __init__(self, x, y, radius):
        self.x = x
        self.y = y
        self.radius = radius

    def draw(self):
        pygame.draw.circle(screen, VORTEX_COLOR, (int(self.x), int(self.y)), self.radius)

# Create a larger vortex
large_vortex = Vortex(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2, LARGE_VORTEX_RADIUS)

# Create a list of smaller vortices
small_vortices = []
for _ in range(NUM_SMALL_VORTICES):
    x = random.randint(0, SCREEN_WIDTH)
    y = random.randint(0, SCREEN_HEIGHT)
    small_vortex = Vortex(x, y, SMALL_VORTEX_RADIUS)
    small_vortices.append(small_vortex)

# Main simulation loop
clock = pygame.time.Clock()
running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Clear the screen
    screen.fill(BACKGROUND_COLOR)

    # Draw and update the larger vortex
    large_vortex.draw()

    # Draw and update the smaller vortices
    for small_vortex in small_vortices:
        small_vortex.draw()

    # Update the display
    pygame.display.flip()
    clock.tick(60)

# Quit Pygame
pygame.quit()
sys.exit()













